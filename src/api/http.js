import axios from 'axios'

// 开发后端地址
axios.defaults.baseURL = 'http://localhost:8080'

// add by axiang [20190613] 对axios进行了二次封装，方便异步await调用
var http = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
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
      axios.post(url, params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default http
