import type { FullUserInfo } from '../utils/typings'

export type BasicUserInfo = Pick<FullUserInfo, 'id' | 'avatar' | 'name' | 'qrCode'>

export interface UserInfo extends BasicUserInfo {
  /**
   * token
   */
  token?: string
}
