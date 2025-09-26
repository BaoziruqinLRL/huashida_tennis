const CryptoJS = require("crypto-js");
const Crypto = require('crypto');

// 默认key 用于user/login的时候使用。当登录之后，key就要换成login接口的参数code中的key=code.subString(code.length() - 64)
const loginKey = 'ed79fe80db6ac20357e5f39fb42bda73c270d1258d9b81385ae0eb12fe4c6e2b'
const loginCode = '17AA92CFAADD41E74D9F9AC23E00AA58D0422C4E17333E6DA520D8BEC4AB83DD714CAE6F8C2AC33071229735D0F515BDEAD3EA852B48C41D64A08A3CFA0A89B4285CB6F98E7ED9F1CE4400846333364F3FB6A3CBBF2E908C5B9F325D33C3438B0637653000394DBFCBB4273120EE9AD4'
const ivRaw = '3aed1e6cb90e98c6'
const authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRTdHIiOiJlNzhmYTM0OWEwNWEwMDE5NWE5YTQxNDYzM2M4OTA4ZTNhY2NmMGRhOTMwMWQ0NjYxM2FiZjcwMzFhMzRkMDQ1Iiwib3BlbmlkIjoib1ZXd1Y1ZUZnUmlUaVp3X1c4bDZPY0FhNl9mbyIsIm5hbWUiOiLmnY7ml6Xlh4wiLCJuaWNrTmFtZSI6IuW-ruS_oeeUqOaItyIsImF2YXRhciI6Imh0dHBzOi8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvUE9nRXdoNG1JSE80bmliSDBLbE1FQ05qakd4UVVxMjRaRWFHVDRwb0M2aWNSaWNjVkdLU3lYd2liY1BxNEJXbWlhSUd1RzFpY3d4YVFYNmdyQzlWZW1ab0o4cmcvMTMyIiwicm9sZSI6InVzZXIiLCJzZXgiOiIwIiwicGhvbmUiOiIxODgxNzg3Nzk4NiIsImJvb2tBdHRyIjoiMyIsImNvZGUiOiIiLCJpZENhcmQiOiI0NjkwMjMxOTk1MDYwMzAwOTgiLCJkZXB0IjoiIiwidW5pdCI6IiIsImFyZWEiOiLkuK3ljJciLCJtZW1vIjpudWxsLCJyZWdpc3RlclRpbWUiOiIyMDI0LTA0LTI5IDIwOjA4OjU5IiwicGFzc3dvcmQiOm51bGwsImlhdCI6MTc1ODg2NzA1MywiZXhwIjoxNzU5NDcxODUzfQ.h1_NNKNK22S8typ2xAwjbFGfXTBqs-Mjm72IIQWvFNg"

function getHeader() {
    return {
        "Host": "mini.ecnu-api2.ziyun188.com",
        "Connection": "keep-alive",
        "xweb_xhr": "1",
        "Authorization": authorization,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11275",
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://servicewechat.com/wx67e47bfe8318b823/45/page-frame.html",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9"
    }
}


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
    encryptDataToCiphertext,
    getHeader
}