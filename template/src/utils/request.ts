import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
})

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    if (data.code !== undefined && data.code !== 0 && data.code !== 200) {
      console.error(`[Request Error] ${data.message || '请求失败'}`)
      return Promise.reject(new Error(data.message || '请求失败'))
    }
    return data
  },
  (error) => {
    const status = error.response?.status
    const messages: Record<number, string> = {
      401: '登录已过期，请重新登录',
      403: '没有权限访问',
      404: '请求的资源不存在',
      500: '服务器内部错误',
    }
    console.error(`[Request Error] ${messages[status] || error.message || '网络异常'}`)
    return Promise.reject(error)
  },
)

function get<T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig) {
  return service.get<any, T>(url, { params, ...config })
}

function post<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig) {
  return service.post<any, T>(url, data, config)
}

function put<T = any>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig) {
  return service.put<any, T>(url, data, config)
}

function del<T = any>(url: string, config?: AxiosRequestConfig) {
  return service.delete<any, T>(url, config)
}

export { get, post, put, del }
export default service
