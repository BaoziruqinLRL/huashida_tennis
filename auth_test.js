const axios = require('axios');
const { decryptCiphertext, encryptDataToCiphertext, getHeader } = require('./securityUtil');

const dataObject = {"venue":"室外篮球场","pageNum":1,"pageSize":10,"area":"中北"}

const url = 'https://mini.ecnu-api2.ziyun188.com/order/list'; // 替换为你的API URL

function orderList() {
  axios.get(url + '?ciphertext=' + encryptDataToCiphertext(dataObject), {
    headers: getHeader()
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