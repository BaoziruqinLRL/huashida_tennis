const CryptoJS = require("crypto-js");
const Crypto = require('crypto');

// 默认key 用于user/login的时候使用。当登录之后，key就要换成login接口的参数code中的key=code.subString(code.length() - 64)
const loginKey = 'ed79fe80db6ac20357e5f39fb42bda73c270d1258d9b81385ae0eb12fe4c6e2b'
const loginCode = '5416A6D8A1B95FFF3ADAD16C42DAEB6848DD18F3E27D0F9E5F450353AAFAA675E18CDA395F02D87C7ECCBFC060E9070469638086C57A1E8FC2C9F5B7B4FEF311E566D1076AF9489EC13C3E9AEF5DFDEAD6E29EA933C1BCCA840228B3036C80004F4888167BA1E69297137FA84DECC6B7'
const ivRaw = '21f61b509c238ed2'

function parseDynamicKey() {
    const codeData = decryptData(loginCode, loginKey)
    return codeData.code.slice(codeData.code.length-64, codeData.code.length)
}

function decryptData(da, key) {
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

function decryptCiphertext(ciphertext) {
    const dynamicKey = parseDynamicKey()
    return decryptData(ciphertext, dynamicKey)
}

function encryptDataToCiphertext(da) {
    const key = parseDynamicKey()
    // 将数据转换为字符串，并进行AES加密
    const enc = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(da)), CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(ivRaw),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const encrypt = enc.ciphertext.toString().toUpperCase();
    return generateRandomString(4) + ivRaw + generateRandomString(4) + " " + encrypt
}

function generateRandomString(length) {
    // 生成一个长度为 `length` 的随机缓冲区
    const buffer = Crypto.randomBytes(Math.ceil(length / 2));

    // 将缓冲区转换为十六进制字符串，并截取前 `length` 个字符
    return buffer.toString('hex').slice(0, length);
}

module.exports = {
    decryptCiphertext,
    encryptDataToCiphertext
}