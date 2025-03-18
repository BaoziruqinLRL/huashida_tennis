const CryptoJS = require('crypto-js');

const key = 'X9YEj3qsS1lSfgge+IlZXw==';

function encryptData(da, ivRaw) {
  // 将数据转换为字符串，并进行AES加密
  const enc = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(da)), CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(ivRaw),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return enc.ciphertext.toString().toUpperCase();
}

// console.info(encryptData(
//   {"description":"中北校区中北塑胶网球场2号场（对校内外开放）1号场","openid":"oVWwV5eFgRiTiZw_W8l6OcAa6_fo","out_trade_no":"a628b225dd344d06b6f456540d637b29","totalFee":4000}, 
//   "64f7f0197851c2dd"
// ))