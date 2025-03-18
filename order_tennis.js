const axios = require('axios');
const Crypto = require('crypto');
const CryptoJS = require('crypto-js');

const amountTable = {
    "19": {
        "time": 19,
        "amount": 50,
        "startTime": "19:00",
        "endTime": "20:00",
        "timeBody": [{
            "start": "19:00",
            "end": "20:00"
        }]
    },
    "20": {
        "time": 20,
        "amount": 50,
        "startTime": "20:00",
        "endTime": "21:00",
        "timeBody": [{
            "start": "20:00",
            "end": "21:00"
        }]
    },
    "21": {
        "time": 21,
        "amount": 50,
        "startTime": "21:00",
        "endTime": "22:00",
        "timeBody": [{
            "start": "21:00",
            "end": "22:00"
        }]
    },
    "10": {
        "time": 10,
        "amount": 40,
        "startTime": "10:00",
        "endTime": "11:00",
        "timeBody": [{
            "start": "10:00",
            "end": "11:00"
        }]
    },
    "12": {
        "time": 12,
        "amount": 40,
        "startTime": "12:00",
        "endTime": "13:00",
        "timeBody": [{
            "start": "12:00",
            "end": "13:00"
        }]
    },
    "13": {
        "time": 13,
        "amount": 40,
        "startTime": "13:00",
        "endTime": "14:00",
        "timeBody": [{
            "start": "13:00",
            "end": "14:00"
        }]
    },
    "14": {
        "time": 14,
        "amount": 40,
        "startTime": "14:00",
        "endTime": "15:00",
        "timeBody": [{
            "start": "14:00",
            "end": "15:00"
        }]
    },
    "17": {
        "time": 17,
        "amount": 40,
        "startTime": "17:00",
        "endTime": "18:00",
        "timeBody": [{
            "start": "17:00",
            "end": "18:00"
        }]
    }
}
const orderObject = {
    "id": "",
    "bookAttr": "3",
    "bookOpenId": "oVWwV5eFgRiTiZw_W8l6OcAa6_fo",
    "bookUserName": "李日凌",
    "bookTime": {
        "date": "2024-07-15",
        "hours": "1",
        "earliestTime": "12:00",
        "latestTime": "13:00",
        "time": [{
            "start": "12:00",
            "end": "13:00"
        }]
    },
    "isAll": "",
    "code": "",
    "device": "",
    "contact": "李日凌",
    "phone": "18817877986",
    "dept": "",
    "idCard": "469023199506030098",
    "unit": "",
    "siteId": "a4bd50bdf0fe49858942c9ab6bc5dc45",
    "siteName": "中北塑胶网球场2号场（对校内外开放）",
    "siteType": "网球场",
    "siteArea": "中北",
    "siteUnit": "4",
    "equipment": "",
    "publicity": "",
    "car": "",
    "memo": "",
    "status": "7",
    "amount": "",
    "cancelReason": "",
    "presentPeopleNum": "1",
    "siteCode": "1"
}
const orderObject_2h = {
    "id": "",
    "bookAttr": "3",
    "bookOpenId": "oVWwV5eFgRiTiZw_W8l6OcAa6_fo",
    "bookUserName": "李日凌",
    "bookTime": {
      "date": "2024-08-03",
      "hours": "2",
      "earliestTime": "19:00",
      "latestTime": "21:00",
      "time": [
        {
          "start": "19:00",
          "end": "20:00"
        },
        {
          "start": "20:00",
          "end": "21:00"
        }
      ]
    },
    "isAll": "",
    "code": "",
    "device": "",
    "contact": "李日凌",
    "phone": "18817877986",
    "dept": "",
    "idCard": "469023199506030098",
    "unit": "",
    "siteId": "a4bd50bdf0fe49858942c9ab6bc5dc45",
    "siteName": "中北塑胶网球场2号场（对校内外开放）",
    "siteType": "网球场",
    "siteArea": "中北",
    "siteUnit": "4",
    "equipment": "",
    "publicity": "",
    "car": "",
    "memo": "",
    "status": "7",
    "amount": "100",
    "cancelReason": "",
    "presentPeopleNum": "1",
    "siteCode": "1"
  }
const orderObject_shanjianqing = {
    "id": "",
    "bookAttr": "3",
    "bookOpenId": "oVWwV5fuOXxoiNW4VLRGYp_3P7QQ",
    "bookUserName": "叶炜",
    "bookTime": {
      "date": "2024-07-16",
      "hours": "1",
      "earliestTime": "13:00",
      "latestTime": "14:00",
      "time": [
        {
          "start": "13:00",
          "end": "14:00"
        }
      ]
    },
    "isAll": "",
    "code": "",
    "device": "",
    "contact": "叶炜",
    "phone": "13162389437",
    "dept": "",
    "idCard": "341103199610082870",
    "unit": "",
    "siteId": "a4bd50bdf0fe49858942c9ab6bc5dc45",
    "siteName": "中北塑胶网球场2号场（对校内外开放）",
    "siteType": "网球场",
    "siteArea": "中北",
    "siteUnit": "4",
    "equipment": "",
    "publicity": "",
    "car": "",
    "memo": "",
    "status": "7",
    "amount": "40",
    "cancelReason": "",
    "presentPeopleNum": "1",
    "siteCode": "1"
  }
  const orderObject_shanjianqing_2h = {
    "id": "",
    "bookAttr": "3",
    "bookOpenId": "oVWwV5fuOXxoiNW4VLRGYp_3P7QQ",
    "bookUserName": "叶炜",
    "bookTime": {
      "date": "2024-07-25",
      "hours": "2",
      "earliestTime": "19:00",
      "latestTime": "21:00",
      "time": [
        {
          "start": "19:00",
          "end": "20:00"
        },
        {
          "start": "20:00",
          "end": "21:00"
        }
      ]
    },
    "isAll": "",
    "code": "",
    "device": "",
    "contact": "叶炜",
    "phone": "13162389437",
    "dept": "",
    "idCard": "341103199610082870",
    "unit": "",
    "siteId": "a4bd50bdf0fe49858942c9ab6bc5dc45",
    "siteName": "中北塑胶网球场2号场（对校内外开放）",
    "siteType": "网球场",
    "siteArea": "中北",
    "siteUnit": "4",
    "equipment": "",
    "publicity": "",
    "car": "",
    "memo": "",
    "status": "7",
    "amount": "100",
    "cancelReason": "",
    "presentPeopleNum": "1",
    "siteCode": "1"
  }
// 定义API URL
const key = 'ed79fe80db6ac20357e5f39fb42bda73c270d1258d9b81385ae0eb12fe4c6e2b';
const createOrderUrl = 'https://mini.ecnu-api2.ziyun188.com/order/edit'; // 替换为你的API URL
// 脚本运行需要修改五个地方
// 1. header中的authorization
// 2. hopeTime-期望时间点
// 3. orderDate-预订场地时间
// 4. orderTime-脚本开始时间，一般是当天中午12点
// 5. 更换orderJson对象数据
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
const hopeTime = ["13"]
const orderTime = new Date('2025-02-21T12:00:00').getTime()
const orderDate = '2025-02-22'
const orderJson = orderObject_shanjianqing
const iv = '3d294c2be50e2bfc'
function fetchAndLogData() {
    let current
    while (true) {
        current = new Date()
        if (current.getTime() >= orderTime) {
            break
        } else {
            console.log((current.toLocaleTimeString() + ': 还没到时间：先睡会......'))
        } 
    }
    doExec(0)
}

function doExec(tryNum) {
    if (tryNum > 10) {
        return
    }
    hopeTime.forEach(time => {
        const amountInfo = amountTable[time]
        const requestBody = JSON.parse(JSON.stringify(orderJson))
        requestBody.amount = amountInfo.amount
        requestBody.bookTime.earliestTime = amountInfo.startTime
        requestBody.bookTime.latestTime = amountInfo.endTime
        requestBody.bookTime.time = amountInfo.timeBody
        requestBody.bookTime.date = orderDate
        const postBody = {
            "ciphertext": generateRandomString(4) + iv + generateRandomString(4) + " " + encryptData(requestBody, iv)
        }
        console.info(new Date().toLocaleTimeString() + ' 即将抢: ' + time + "点的场地......")
        axios.post(createOrderUrl, postBody, {
            headers: header
        }).then(response => {
            if (JSON.stringify(response.data).startsWith("{")) {
                const createResult = decryptData(response.data.ciphertext, iv)
                if (createResult.code !== 200) {
                    console.info("请求失败: " + JSON.stringify(response.data))
                    doExec(tryNum + 1)
                }else {
                    console.info(new Date().toLocaleTimeString() + " " + time + "点场地提交成功: " + JSON.stringify(createResult))
                }
            } else {
                console.info("response is not json")
            }
        })
        .catch(error => {
            console.error("time: 【" + time + '】 Error fetching data. status is ' + error.response.status);
            console.error("time: 【" + time + '】 Error info: ' + JSON.stringify(error.response.data))
        });
    })
}

function generateRandomString(length) {
    // 生成一个长度为 `length` 的随机缓冲区
    const buffer = Crypto.randomBytes(Math.ceil(length / 2));

    // 将缓冲区转换为十六进制字符串，并截取前 `length` 个字符
    return buffer.toString('hex').slice(0, length);
}

// 立即执行一次请求
fetchAndLogData();

// 设置定时器，每隔100毫秒执行一次fetchAndLogData函数
// setInterval(fetchAndLogData, 100);


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
