import type { T1 } from '@/utils/typings'

//分组
export interface GroupList {
  /**
   * 当前所在页
   */
  current: number
  /**
   * 每页个数
   */
  size: number
  /**
   * 总页数
   */
  pages: number
  /**
   * 总数
   */
  total: number
  /**
   * 分组数组
   */
  groupsData: T1[]
}

export interface Friend {
  /**
   * 好友ID
   */
  id: number
  /**
   * 好友备注
   */
  notes: string
  /**
   * 好友名字
   */
  name: string
  /**
   * 用户ID
   */
  userId: number
  /**
   * 好友头像
   */
  avatar: string
  /**
   * 好友二维码
   */
  qrCode: string
  /**
   * 好友状态
   */
  checked?: boolean
}

export interface Friends {
  /**
   * 分组ID
   */
  id: number
  /**
   * 分组名
   */
  name: string
  /**
   * 朋友数组
   */
  friendVO: Friend[]
}
