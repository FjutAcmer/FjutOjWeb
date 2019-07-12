import axios from 'axios'
import { Message } from 'element-ui'
const store = require('../store/index')

// 开发后端地址
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000
axios.interceptors.response.use(
  res => { return res },
  error => {
    if (error.response.status === 500) {
      Message.error(error.response.data.msg)
    } else {
      Message.error('服务器繁忙，请稍后重试！')
    }
    return Promise.reject(error)
  }
)

// add by axiang [20190613] 对axios进行了二次封装， 1.将token封装在请求头部中，方便权限验证； 2.方便
var http = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      axios(
        {
          method: 'get',
          url: url,
          params: params,
          headers: {
            'auth': store.default.getters.getToken
          }
        }
      ).then(response => {
        resolve(response.data)
      })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  post: function (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        params: params,
        headers: {
          'auth': store.default.getters.getToken
        }
      }).then(response => {
        resolve(response.data)
      })
        .catch(error => {
          console.log(error)
          // if (error.response.status === 500) {
          //   Message.error('error: ' + error.response.data)
          // }
          reject(error)
        })
    })
  }
}
export default http
