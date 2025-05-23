import { generateKeyPair as generateKeyPairNode, createSign, createVerify } from 'crypto';

export const generateKeyPair = (): Promise<{ publicKey: string; privateKey: string }> => {
  return new Promise((resolve, reject) => {
    generateKeyPairNode(
      'rsa',
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        } else {
          resolve({ publicKey, privateKey });
        }
      }
    );
  });
};

export const signData = (privateKey: string, data: string): string => {
  const sign = createSign('SHA256');
  sign.update(data);
  sign.end();
  const signature = sign.sign(privateKey, 'base64');
  return signature;
};

export const verifySignature = (publicKey: string, data: string, signature: string): boolean => {
  const verify = createVerify('SHA256');
  verify.update(data);
  verify.end();
  return verify.verify(publicKey, signature, 'base64');
};
