const axios = require('axios');
const Crypto = require('crypto');
const CryptoJS = require('crypto-js');

const header = {
  "Host": "mini.ecnu-api2.ziyun188.com",
  "Connection": "keep-alive",
  "xweb_xhr": "1",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJvVld3VjVmdU9YeG9pTlc0VkxSR1lwXzNQN1FRIiwibmFtZSI6IuWPtueCnCIsIm5pY2tOYW1lIjoi5b6u5L-h55So5oi3IiwiYXZhdGFyIjoiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9QT2dFd2g0bUlITzRuaWJIMEtsTUVDTmpqR3hRVXEyNFpFYUdUNHBvQzZpY1JpY2NWR0tTeVh3aWJjUHE0QldtaWFJR3VHMWljd3hhUVg2Z3JDOVZlbVpvSjhyZy8xMzIiLCJyb2xlIjoidXNlciIsInNleCI6IjAiLCJwaG9uZSI6IjEzMTYyMzg5NDM3IiwiYm9va0F0dHIiOiIzIiwiY29kZSI6IiIsImlkQ2FyZCI6IjM0MTEwMzE5OTYxMDA4Mjg3MCIsImRlcHQiOiIiLCJ1bml0IjoiIiwiYXJlYSI6IuS4reWMlyIsIm1lbW8iOm51bGwsInJlZ2lzdGVyVGltZSI6IjIwMjMtMTItMTQgMTg6Mjc6NDUiLCJwYXNzd29yZCI6bnVsbCwiaWF0IjoxNzQwMTA3ODM5LCJleHAiOjE3NDA3MTI2Mzl9.PNubV47ghAKS0mUHuohD1XLoyffkcaOH_wwdP3p7Jf0",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11275",
  "Content-Type": "application/json",
  "Accept": "*/*",
  "Sec-Fetch-Site": "cross-site",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
  "Referer": "https://servicewechat.com/wx67e47bfe8318b823/41/page-frame.html",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh;q=0.9"
}
const dataObject = {"venue":"室外篮球场","pageNum":1,"pageSize":10,"area":"中北"}

const key = 'ed79fe80db6ac20357e5f39fb42bda73c270d1258d9b81385ae0eb12fe4c6e2b';
const url = 'https://mini.ecnu-api2.ziyun188.com/order/list'; // 替换为你的API URL

function orderList() {
  const nonce = '3d294c2be50e2bfc'
  const encrypt = encryptData(dataObject, nonce)
  axios.get(url + '?ciphertext=' + generateRandomString(4) + nonce + generateRandomString(4) + " " + encrypt, {
    headers: header
  }).then(response => {
    if (JSON.stringify(response.data).startsWith("{")) {
      const createResult = decryptData(response.data.ciphertext, nonce)
      if (createResult.code !== 200) {
        console.info("请求失败: " + JSON.stringify(response.data))
      }else {
        console.info("请求结果：" + JSON.stringify(createResult))
      }
    } else {
      console.info("response is not json")
    }
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
}

function generateRandomString(length) {
  // 生成一个长度为 `length` 的随机缓冲区
  const buffer = Crypto.randomBytes(Math.ceil(length / 2));

  // 将缓冲区转换为十六进制字符串，并截取前 `length` 个字符
  return buffer.toString('hex').slice(0, length);
}

function encryptData(da, ivRaw) {
  // 将数据转换为字符串，并进行AES加密
  const enc = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(da)), CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(ivRaw),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return enc.ciphertext.toString().toUpperCase();
}


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

orderList()