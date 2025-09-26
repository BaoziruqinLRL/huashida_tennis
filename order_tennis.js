const axios = require('axios');
const { decryptCiphertext, encryptDataToCiphertext, getHeader } = require('./securityUtil');

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
// 2. hopeTime-期望时间点
// 3. orderDate-预订场地时间
// 4. orderTime-脚本开始时间，一般是当天中午12点
// 5. 更换orderJson对象数据
const hopeTime = ["19"]
const orderTime = new Date('2025-09-25T12:00:01').getTime()
const orderDate = '2025-09-26'
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

async function doExec(tryNum) {
    if (tryNum > 10) {
        return
    }
    if (tryNum > 0) {
        await sleep(100)
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
            headers: getHeader()
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
            doExec(tryNum + 1)
        });
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// 立即执行一次请求
fetchAndLogData();

// 设置定时器，每隔100毫秒执行一次fetchAndLogData函数
// setInterval(fetchAndLogData, 100);