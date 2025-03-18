const axios = require('axios');
const Crypto = require('crypto');
const CryptoJS = require('crypto-js');


const key = 'X9YEj3qsS1lSfgge+IlZXw==';
const url = 'https://mini.ecnu-api.ziyun188.com/site/book/list'; // 替换为你的API URL

// 修改date参数
const monitor_param = {"siteId":"a4bd50bdf0fe49858942c9ab6bc5dc45","date":"2024-07-17","bookAttr":"3"}

const header = {
  "Host": "mini.ecnu-api.ziyun188.com",
  "Connection": "keep-alive",
  "xweb_xhr": 1,
  "Authorization": "ZiYun-eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqMUj1v2zAU_CsFR8OOSErW15YKrpIGjZ3UtQMvBk2xEh2JlCUqkhNkboYgU4FMHToU6NKu7dT-mdj9G6XsTl3a7e7e4b17j7wBMmeCR8AHcjKtJ332Ij7nYz6r51M3tYf0kNjztxJ0QVWyAvg3_-0XJGPatf3wsH38tHl330qcXp7u5c2Pr08_P_56_3l7901XyBVRRLcHiVJ56RuGSngR1c3BKpWxPKDCyLJ2sHHF5yY2RsN4UCdWdnw0tARfHMGT9NUgOF0uw-bszQpbswEJx1YuA5vTc07pJDx5vb6o-YKOVtbzacbJcViFiNO6IWcXdlwE3oRlM_nSLWIDmVgnKmTa5txt3QUlazSBGuWJFG0BuS5yXMfxXFurCykvD5VqNzA1pTJqPRrxKCBFey3L9iA2kef1oQ1NCD1XVyOWq72vEvwPIgUjGj19_7K5f9Q8Y5kEvqjSVIdiMS8VK8Z8d0QMsdWDVg97zzD0oev3vTYhKcta7oZ2Oh0tMEGLdTto30RIQdme3HaBkoqkwEc6qkiIiHawrBZ_PR0vS61c83UlNFsqrtko6P3jD7Am1_0cjBB2oI1ufwMAAP__.NAiBkKpd8AU-MEtYKEqQUksGmZio2OH3fVctLIAec5E",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b13)XWEB/9185",
  "Content-Type": "application/json",
  "Accept": "*/*",
  "Sec-Fetch-Site": "cross-site",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
  "Referer": "https://servicewechat.com/wx67e47bfe8318b823/34/page-frame.html",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh;q=0.9"
}
const monitorTime = ["19:00", "20:00"]

setInterval(monitor, 2000)

function monitor() {
  const nonce = generateRandomString(16)
  const encrypt = encryptData(monitor_param, nonce)
  axios.get(url + '?encrypt=' + encrypt + "&nonce=" + nonce, {
    headers: header
  }).then(response => {
      if (JSON.stringify(response.data).startsWith("{")) {
        if (response.data.code !== 200) {
          console.info("请求失败: " + JSON.stringify(response.data))
        }
      } else {
        const createResult = decryptData(response.data, nonce)
        // console.info("请求结果：" + JSON.stringify(createResult))
        const siteData = createResult.data[0]
        let haveEmpty = false
        siteData.timeList.forEach(time => {
          if (monitorTime.includes(time.startTime)) {
            if (time.placeBook["1"].isCanBook === '1') {
              // 场地可订
              console.info(monitor_param.date + " " + time.startTime + "有空场地")
              haveEmpty = true
            }
          }
        })
        if (!haveEmpty) {
          console.info(monitor_param.date + " 暂时没有空场地")
        }
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