import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  email: string;
  passwordHash: string;
  kycData: any;
}

const users: User[] = [];

export const registerUser = async (email: string, password: string, kycData: any) => {
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: (users.length + 1).toString(),
    email,
    passwordHash,
    kycData,
  };
  users.push(newUser);
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  // For demo, no 2FA check here, add as needed
  const token = jwt.sign({ userId: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
  return { token, twoFactorRequired: false };
};
