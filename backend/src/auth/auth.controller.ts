import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, kycData } = req.body;
    if (!email || !password || !kycData) {
      return res.status(400).json({ error: 'Email, password, and KYC data are required' });
    }
    const user = await registerUser(email, password, kycData);
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (!result) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
