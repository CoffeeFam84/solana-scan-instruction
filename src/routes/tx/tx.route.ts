import express from 'express';

import txController from '../../controllers/tx.controller';

const router = express.Router();

router.get(
  '/deposits/:wallet',
  txController.getDeposits
);

export default router;
