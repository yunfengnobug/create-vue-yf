import { get, post } from '@/utils/request'

/** 示例：获取用户信息 */
export const getUserInfo = () => get('/user/info')

/** 示例：用户登录 */
export const login = (data: { username: string; password: string }) => post('/auth/login', data)
