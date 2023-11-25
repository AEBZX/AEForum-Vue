import cryptoJs from 'crypto-js';
const generatekey = (num) => {
  let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (var i = 0; i < num; i++) {
    let randomPoz = Math.floor(Math.random() * library.length);
    key += library.substring(randomPoz, randomPoz + 1);
  }
  return key;
}
const encryptDes = (message, key = 'abcd@1234') => {
  var keyHex = cryptoJs.enc.Utf8.parse(key)
  var option = { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 }
  var encrypted = cryptoJs.DES.encrypt(message, keyHex, option)
  return encrypted.ciphertext.toString()
}
const decryptDes = (message, key = 'abcd@1234') => {
  var keyHex = cryptoJs.enc.Utf8.parse(key)
  var decrypted = cryptoJs.DES.decrypt(
    {
      ciphertext: cryptoJs.enc.Hex.parse(message)
    },
    keyHex,
    {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7
    }
  )
  return decrypted.toString(cryptoJs.enc.Utf8)
}
export default {
  generatekey,
  encryptDes,
  decryptDes,
}
