import { Router } from 'express';
import { createKeyPair, sign, verify } from './certificate.controller';

const router = Router();

router.post('/generate-keypair', createKeyPair);
router.post('/sign', sign);
router.post('/verify', verify);

export default router;
