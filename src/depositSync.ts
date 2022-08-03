
import { getDepositTxs, getRecentSignature } from './services/tx.service';

const startSyncingDepositTx = async () => {
  let recentSignature = await getRecentSignature();
  setTimeout(async function run() {
    console.log('recentSignature: ', recentSignature);
    recentSignature = await getDepositTxs(recentSignature);
    setTimeout(run, 3000)
  });
}

export {
  startSyncingDepositTx
}