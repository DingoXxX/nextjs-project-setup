import { Request, Response } from 'express';
import {
  getUserProfile,
  updateUserProfile,
  enableTwoFactorAuth,
  disableTwoFactorAuth,
  verifyTwoFactorCode,
  revokeUserCertificate,
} from './account.service';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId || '1'; // Placeholder for authenticated user ID
    const user = await getUserProfile(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId || '1'; // Placeholder for authenticated user ID
    await updateUserProfile(userId, req.body);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateSecuritySettings = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId || '1'; // Placeholder for authenticated user ID
    const { action, token } = req.body;

    if (action === 'enable') {
      const secret = await enableTwoFactorAuth(userId);
      res.status(200).json({ message: '2FA enabled', secret });
    } else if (action === 'disable') {
      await disableTwoFactorAuth(userId);
      res.status(200).json({ message: '2FA disabled' });
    } else if (action === 'verify') {
      if (!token) {
        return res.status(400).json({ error: 'Token required for verification' });
      }
      const isValid = await verifyTwoFactorCode(userId, token);
      if (isValid) {
        res.status(200).json({ message: '2FA token verified' });
      } else {
        res.status(400).json({ error: 'Invalid 2FA token' });
      }
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const revokeCertificate = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId || '1'; // Placeholder for authenticated user ID
    const { certificateId } = req.body;
    await revokeUserCertificate(userId, certificateId);
    res.status(200).json({ message: 'Certificate revoked successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

import { Request, Response } from 'express';
import { enableTwoFactorAuth, disableTwoFactorAuth, verifyTwoFactorToken } from '../security/twoFactor.utils';

export const updateSecuritySettings = async (req: Request, res: Response) => {
  try {
    const { action, token, secret } = req.body;

    if (action === 'enable') {
      // Generate 2FA secret and return to user
      const twoFactorSecret = enableTwoFactorAuth();
      // Save secret to user profile in DB (placeholder)
      res.status(200).json({ message: '2FA enabled', secret: twoFactorSecret.base32 });
    } else if (action === 'disable') {
      // Remove 2FA secret from user profile in DB (placeholder)
      disableTwoFactorAuth();
      res.status(200).json({ message: '2FA disabled' });
    } else if (action === 'verify') {
      if (!token || !secret) {
        return res.status(400).json({ error: 'Token and secret required for verification' });
      }
      const isValid = verifyTwoFactorToken(secret, token);
      if (isValid) {
        res.status(200).json({ message: '2FA token verified' });
      } else {
        res.status(400).json({ error: 'Invalid 2FA token' });
      }
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const revokeCertificate = async (req: Request, res: Response) => {
  try {
    // Placeholder: Revoke certificate logic
    res.status(200).json({ message: 'Certificate revoked successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
