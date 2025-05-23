import speakeasy from 'speakeasy';

export const generateTwoFactorSecret = () => {
  return speakeasy.generateSecret({ length: 20 });
};

export const verifyTwoFactorToken = (secret: string, token: string): boolean => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1,
  });
};
