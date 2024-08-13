import CryptoJS from 'crypto-js';

/**
 * Encrypts a string
 * @param plain the string that wants to be encoded
 * @param secret secret keys
 * @returns result of encoding
 */
export const encryptedDDataString = (plain: string, secret: string) => {
  return encodeURIComponent(CryptoJS.AES.encrypt(plain, secret).toString());
};

/**
 * Decrypts a string
 * @param plainSecure string encoded that wants to be decoded
 * @param secret secret keys
 * @returns result of decoding
 */
export const decryptedDataString = (plainSecure: string, secret: string) => {
  const deData = CryptoJS.AES.decrypt(decodeURIComponent(plainSecure), secret);

  return deData.toString(CryptoJS.enc.Utf8);
};
