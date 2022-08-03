import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('tx_deposit', { orderBy: {  id: 'ASC' } })
export class Transaction {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  // @Unique(['email'])
  blocktime: string;

  @Column()
  slot: string;

  @Column()
  signature: string;

  @Column()
  blockhash: string;

  @Column()
  wallet: string;

  @Column()
  payment_account: string;

  @Column()
  transfer_authority: string;

  @Column()
  escrow_payment_account: string;

  @Column()
  treasury_mint: string;

  @Column()
  authority: string;

  @Column()
  auction_house: string;

  @Column()
  auction_house_fee_account: string;

  @Column({ type: 'bigint' })
  amount: bigint;
}
