import { generateTwoFactorSecret, verifyTwoFactorToken } from '../security/twoFactor.utils';

interface User {
  id: string;
  email: string;
  name: string;
  twoFactorSecret?: string;
}

const users: User[] = [
  { id: '1', email: 'user@example.com', name: 'John Doe' },
]; // In-memory user store for demo, replace with DB

export const getUserProfile = async (userId: string) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  return { id: user.id, email: user.email, name: user.name };
};

export const updateUserProfile = async (userId: string, profileData: Partial<User>) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  if (profileData.email) user.email = profileData.email;
  if (profileData.name) user.name = profileData.name;
  return { success: true };
};

export const enableTwoFactorAuth = async (userId: string) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  const secret = generateTwoFactorSecret();
  user.twoFactorSecret = secret.base32;
  return secret.base32;
};

export const disableTwoFactorAuth = async (userId: string) => {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('User not found');
  user.twoFactorSecret = undefined;
  return true;
};

export const verifyTwoFactorCode = async (userId: string, token: string) => {
  const user = users.find((u) => u.id === userId);
  if (!user || !user.twoFactorSecret) return false;
  return verifyTwoFactorToken(user.twoFactorSecret, token);
};

export const revokeUserCertificate = async (userId: string, certificateId: string) => {
  // Placeholder: Revoke certificate logic
  return { success: true };
};
