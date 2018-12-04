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
// 获取用户列表
export const getUserList = (params) => {
  return axios.get('users', {
    params: params
  })
    .then((results) => {
      return results.data
    })
}
// 登录验证接口方法
export const addUser = (params) => {
  return axios.post('users', params)
    .then((results) => {
      return results.data
    })
}

// 编辑用户
export const editUser = (params) => {
  return axios.put(`users/${params.id}`, params)
    .then((results) => {
      return results.data
    })
}

// 删除用户
export const deleteUser = (id) => {
  return axios.delete(`users/${id}`)
    .then((results) => {
      return results.data
    })
}

// 修改用户状态
export const changeUserState = (uid, type) => {
  return axios.put(`users/${uid}/state/${type}`)
    .then((results) => {
      // console.log(results)
      return results.data
    })
}

// 获取用户角色信息
export const getUserRolesList = () => {
  return axios.get('roles')
    .then((results) => {
      return results.data
    })
}

// 授予用户角色
export const grantUserRoles = (params) => {
  // console.log(params)
  return axios.put(`users/${params.id}/role`, {rid: params.rid})
    .then((results) => {
      return results.data
    })
}

// 根据用户id 获取用户角色
export const getUserById = (id) => {
  return axios.get(`users/${id}`)
    .then((results) => {
      return results.data
    })
}

// 获取全部权限数据
export const getRightsList = (type) => {
  return axios.get(`rights/${type}`)
    .then((results) => {
      return results.data
    })
}

// 获取所有权限的数据
// export const getGrantList = () => {
//   return axios.get(`rights/tree`)
//     .then((results) => {
//       return results.data
//     })
// }
// 角色授权
export const grantRolesById = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, {rids})
    .then((results) => {
      return results.data
    })
}

// 添加角色
export const addRole = (params) => {
  return axios.post(`roles`, params)
    .then((results) => {
      return results.data
    })
}

// 编辑角色
export const editRole = (params) => {
  return axios.put(`roles/${params.id}`, params)
    .then((results) => {
      return results.data
    })
}

// 删除角色、
export const deleteRole = (id) => {
  return axios.delete(`roles/${id}`)
    .then((results) => {
      return results.data
    })
}
