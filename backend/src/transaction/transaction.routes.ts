import { Router } from 'express';
import { createTransfer } from './transaction.controller';

const router = Router();

router.post('/transfer', createTransfer);

export default router;
