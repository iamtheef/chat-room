import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

export const decrypt = (str: string) => {
  let bytes = AES.decrypt(str, process.env.REACT_APP_key!);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const encrypt = (str: string) => {
  return AES.encrypt(str, process.env.REACT_APP_key!).toString();
};
