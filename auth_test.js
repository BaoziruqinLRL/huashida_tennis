const axios = require('axios');
const { decryptCiphertext, encryptDataToCiphertext } = require('./securityUtil');

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
  "Referer": "https://servicewechat.com/wx67e47bfe8318b823/45/page-frame.html",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh;q=0.9"
}
const dataObject = {"venue":"室外篮球场","pageNum":1,"pageSize":10,"area":"中北"}

const url = 'https://mini.ecnu-api2.ziyun188.com/order/list'; // 替换为你的API URL

function orderList() {
  axios.get(url + '?ciphertext=' + encryptDataToCiphertext(dataObject), {
    headers: header
  }).then(response => {
    if (JSON.stringify(response.data).startsWith("{")) {
      const createResult = decryptCiphertext(response.data.ciphertext)
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

orderList()