// 密码登录的表单数据
export interface PasswordLoginForm {
  /**
   * 手机号
   */
  account: string
  /**
   * 密码
   */
  password: string
}

// 响应数据
export interface LoginResponse {
  token: string
  id: string
}
