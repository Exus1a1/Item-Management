export interface MessageList {
  /**
   * 当前所在页
   */
  currentPage: number
  /**
   * 总页数
   */
  total: number
  /**
   * 消息框数组
   */
  messageList: MessageItem[]
}

export interface MessageItem {
  /**
   * 消息id
   */
  id: number
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户名
   */
  username: string
  /**
   * 简介显示内容
   */
  content: string
  /**
   * 聊天记录界面
   */
  message: MessageDetail
}

// 聊天界面
export interface MessageDetail {
  /**
   * 当前聊天的用户id
   */
  userId: number
  /**
   * 与当前用户的聊天记录
   */
  chatLogList: MessageDetailLogs[]
}

// 聊天记录
export interface MessageDetailLogs {
  /**
   * 当条消息发送者的id
   */
  id: string
  /**
   * 类型，0 系统消息，1 好友申请，2 管理申请，3 物品分享
   */
  types: number
  /**
   * 时间
   */
  time: string
  /**
   * 标题
   */
  title: string
  /**
   * 内容
   */
  content: string
  /**
   * 图片
   */
  cover: string
  /**
   * 房子名
   */
  roomName: string
  /**
   * 状态，0 已失效，1 未失效
   */
  status: number
}
