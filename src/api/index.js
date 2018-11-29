// 处理请求
// 导入 axios 模块
import axios from 'axios'
// 配置基准路径
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前获取token
  const userToken = sessionStorage.getItem('userToken')
  // console.log(config)
  if (userToken) {
    config.headers['Authorization'] = userToken
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 使用 export 暴露对外接口
// 登录验证接口方法
export const login = (params) => {
  return axios.post('login', params)
    .then((results) => {
      return results.data
    })
}
