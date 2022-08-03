import bs58 from 'bs58';
import { getRepository } from 'typeorm';
import { Cluster } from '@solana/web3.js'
import { getSignaturesForAddress, getTransaction } from '../api';
import { Transaction } from '../entities/tx/tx.entity';
import application from '../constants/application';
import logger from '../config/logger';

const getDepositTxs = async (lastSignature: string | undefined) => {
  const pastSignatures = await getSignaturesForAddress(application.env.cluster as Cluster, application.env.auctionHouseProgram, lastSignature);
  let recentSignature = lastSignature;
  // console.log('signature length', lastSignature, pastSignatures.length);
  if (pastSignatures.length > 0) recentSignature = pastSignatures[0].signature;
  let cnt = 0;
  for (let i = pastSignatures.length - 1; i >= 0; i--) {
    const {signature} = pastSignatures[i];
    const tx = await getTransaction(application.env.cluster as Cluster, signature);
    const { transaction: { message: { accountKeys, instructions, recentBlockhash }, signatures }, blockTime, slot } = tx;
    let depositIns = instructions.find((inst: any) => inst.data.startsWith("3GyWrkssW12w"));
    if (depositIns === undefined) continue;
    
    const walletId = depositIns.accounts[0];
    const paymentAccountId = depositIns.accounts[1];
    const transferAuthorityId = depositIns.accounts[2];
    const escrowPaymentAccountId = depositIns.accounts[3];
    const treasuryMintId = depositIns.accounts[4];
    const authorityId = depositIns.accounts[5];
    const auctionHouseId = depositIns.accounts[6];
    const auctionHouseFeeAccountId = depositIns.accounts[7];
    const hexData = bs58.decode(depositIns.data);
    const hexAmount = hexData.slice(-8);
    const decAmount = Buffer.from(hexAmount).readBigInt64LE(0);
    saveDepositTx(
      blockTime, 
      slot, 
      signatures[0], 
      recentBlockhash, 
      accountKeys[walletId], 
      accountKeys[paymentAccountId],
      accountKeys[transferAuthorityId],
      accountKeys[escrowPaymentAccountId],
      accountKeys[treasuryMintId],
      accountKeys[authorityId],
      accountKeys[auctionHouseId],
      accountKeys[auctionHouseFeeAccountId],
      decAmount
    );
    cnt++;
  }
  if (cnt > 0)
    logger.info(`${cnt} deposits synced.`);
  return recentSignature;
}

const saveDepositTx = async (
  blocktime: string,
  slot: string,
  signature: string,
  blockhash: string,
  wallet: string,
  payment_account: string,
  transfer_authority: string,
  escrow_payment_account: string,
  treasury_mint: string,
  authority: string,
  auction_house: string,
  auction_house_fee_account: string,
  amount: bigint
) => {
  const newTx = new Transaction();
  newTx.blocktime = blocktime;
  newTx.slot = slot;
  newTx.signature = signature;
  newTx.blockhash = blockhash;
  newTx.wallet = wallet;
  newTx.payment_account = payment_account;
  newTx.transfer_authority = transfer_authority;
  newTx.escrow_payment_account = escrow_payment_account;
  newTx.treasury_mint = treasury_mint;
  newTx.authority = authority;
  newTx.auction_house = auction_house;
  newTx.auction_house_fee_account = auction_house_fee_account;
  newTx.amount = amount;

  return await getRepository(Transaction).save(newTx);
}

const getDepositsByWallet = async (wallet: string | undefined) => {
  let query : any = {};
  if (wallet !== undefined)
    query.wallet = wallet;  
  return await getRepository(Transaction).find(query);
}

const getRecentSignature = async () => {
  const tx = await getRepository(Transaction).findOne({order: { blocktime: 'DESC'}});
  if (tx === undefined)
    return undefined;
  return tx.signature;
}

export {
  getDepositTxs,
  getDepositsByWallet,
  getRecentSignature
}