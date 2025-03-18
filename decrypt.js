const CryptoJS = require('crypto-js');

// const key = 'X9YEj3qsS1lSfgge+IlZXw==';
const key = 'ed79fe80db6ac20357e5f39fb42bda73c270d1258d9b81385ae0eb12fe4c6e2b'


function decryptData(da, ivRaw) {
  const hexdata = CryptoJS.enc.Hex.parse(da)
  const basedata = CryptoJS.enc.Base64.stringify(hexdata)
  // 解密数据
  const bytes = CryptoJS.AES.decrypt(basedata, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(ivRaw),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // 将解密后的数据转换为原始形式
  const toS = bytes.toString(CryptoJS.enc.Utf8)
  const decryptedData = JSON.parse(toS);
  return decryptedData
}

console.info(JSON.stringify(decryptData(
  "dd72afd98c6991c4b3b90a569e6ff9c370daf1e0a3648978329eee9d0366003d2fbeddbea041247e98971fcd40d394f0ef7664abe706b1b7794c26b977da68d0f48f57c8261f181887fa6ae9a197233513e563594a0836665f950cd3de4f9708",
  '5357df6c70ee6d66'
)));