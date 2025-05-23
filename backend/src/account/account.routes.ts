import { Router } from 'express';
import * as accountController from './account.controller';

const router = Router();

router.get('/profile/:userId?', (req, res) => accountController.getProfile(req, res));
router.put('/profile/:userId?', (req, res) => accountController.updateProfile(req, res));
router.put('/security-settings/:userId?', (req, res) => accountController.updateSecuritySettings(req, res));
router.post('/revoke-certificate/:userId?', (req, res) => accountController.revokeCertificate(req, res));

export default router;
