const axios = require('axios');
const { decryptCiphertext, encryptDataToCiphertext } = require('./securityUtil');

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
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRTdHIiOiI3YzhmNjAyNzRlMDg1MDE4OGMzN2I0NGNhMmQ1MjkxYjkxYTI0NjgwMTJjNDRkOTcxYmY2MmRmOGQ4MWM5OWZjIiwib3BlbmlkIjoib1ZXd1Y1ZUZnUmlUaVp3X1c4bDZPY0FhNl9mbyIsIm5hbWUiOiLmnY7ml6Xlh4wiLCJuaWNrTmFtZSI6IuW-ruS_oeeUqOaItyIsImF2YXRhciI6Imh0dHBzOi8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvUE9nRXdoNG1JSE80bmliSDBLbE1FQ05qakd4UVVxMjRaRWFHVDRwb0M2aWNSaWNjVkdLU3lYd2liY1BxNEJXbWlhSUd1RzFpY3d4YVFYNmdyQzlWZW1ab0o4cmcvMTMyIiwicm9sZSI6InVzZXIiLCJzZXgiOiIwIiwicGhvbmUiOiIxODgxNzg3Nzk4NiIsImJvb2tBdHRyIjoiMyIsImNvZGUiOiIiLCJpZENhcmQiOiI0NjkwMjMxOTk1MDYwMzAwOTgiLCJkZXB0IjoiIiwidW5pdCI6IiIsImFyZWEiOiLkuK3ljJciLCJtZW1vIjpudWxsLCJyZWdpc3RlclRpbWUiOiIyMDI0LTA0LTI5IDIwOjA4OjU5IiwicGFzc3dvcmQiOm51bGwsImlhdCI6MTc1Njk2NjA3OCwiZXhwIjoxNzU3NTcwODc4fQ.Wafn2kaXEoJfnbkTV0r1_478Pd3dBVQx-TwpVv7o7Pc",
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
const orderTime = new Date('2025-09-04T12:00:00').getTime()
const orderDate = '2025-09-05'
const orderJson = orderObject
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
            "ciphertext": encryptDataToCiphertext(requestBody)
        }
        console.info(new Date().toLocaleTimeString() + ' 即将抢: ' + time + "点的场地......")
        axios.post(createOrderUrl, postBody, {
            headers: header
        }).then(response => {
            if (JSON.stringify(response.data).startsWith("{")) {
                const createResult = decryptCiphertext(response.data.ciphertext)
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
// 立即执行一次请求
fetchAndLogData();

// 设置定时器，每隔100毫秒执行一次fetchAndLogData函数
// setInterval(fetchAndLogData, 100);