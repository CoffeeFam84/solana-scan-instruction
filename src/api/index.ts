import axios from 'axios'
import { Cluster } from '@solana/web3.js'
import application from '../constants/application';

/**
 * Returns transaction signatures.
 *
 * @param {Cluster} cluster - Solana Cluster.
 * @param {String} tokenAddress - Token Address.
 * @param {String} untilSignature - Start searching backwards from this transaction signature. 
 * @returns {Array} Return array of signatures. 
 */
const getSignaturesForAddress = async  (cluster: Cluster, tokenAddress: String, untilSignature: String) => {
  const res:any = await axios.post(application.RPCUrl[cluster], {
    jsonrpc: "2.0",
    id: 1,
    method: "getSignaturesForAddress",
    params: [
      tokenAddress,
      {
        until: untilSignature
      }
    ]
  });

  return res.data.result;
}

/**
 * Returns transaction.
 *
 * @param {Cluster} cluster - Solana Cluster.
 * @param {String} signature - Transaction Signature.
 * @returns {Array} Return transaction data. 
 */
 const getTransaction = async (cluster: Cluster, signature: String) => {
  const res:any = await axios.post(application.RPCUrl[cluster], {
    jsonrpc: "2.0",
    id: 1,
    method: "getTransaction",
    params: [
      signature,
      "json"
    ]
  });
  return res.data.result;
}

export {
  getSignaturesForAddress,
  getTransaction
}