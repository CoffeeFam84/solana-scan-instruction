import httpStatusCodes from 'http-status-codes';

import {getDepositsByWallet} from '../services/tx.service';
import IController from '../types/IController';
import apiResponse from '../utilities/apiResponse';

const getDeposits: IController = async (req, res) => {
  const deposits = await getDepositsByWallet(req.params.wallet);
  apiResponse.result(res, deposits, httpStatusCodes.OK);
};

export default {
  getDeposits
};
