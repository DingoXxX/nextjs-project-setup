import { Request, Response } from 'express';
import { generateKeyPair, signData, verifySignature } from './certificate.service';

export const createKeyPair = async (req: Request, res: Response) => {
  try {
    const keyPair = await generateKeyPair();
    res.status(201).json(keyPair);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const sign = async (req: Request, res: Response) => {
  try {
    const { privateKey, data } = req.body;
    const signature = await signData(privateKey, data);
    res.status(200).json({ signature });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { publicKey, data, signature } = req.body;
    const isValid = await verifySignature(publicKey, data, signature);
    res.status(200).json({ valid: isValid });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
