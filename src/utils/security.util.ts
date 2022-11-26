import CryptoJS from 'crypto-js';

export const encryptedDDataString = (plain: string) => {
  return encodeURIComponent(
    CryptoJS.AES.encrypt(plain, import.meta.env.APP_SECRET_COOKIE).toString(),
  );
};

export const decryptedDataString = (plainSecure: string) => {
  const deData = CryptoJS.AES.decrypt(
    decodeURIComponent(plainSecure),
    import.meta.env.APP_SECRET_COOKIE,
  );

  return deData.toString(CryptoJS.enc.Utf8);
};
