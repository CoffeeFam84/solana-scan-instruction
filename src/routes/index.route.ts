import * as express from 'express';

import txRouter from './tx/tx.route';

const router = express.Router();

router.use('/tx', txRouter);

export default router;
