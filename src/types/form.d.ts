// 通用类型
interface T1 {
  /**
   * 名字
   */
  name: string
  /**
   * id
   */
  id: number
}

// 空间物品表单数据通用类型
interface T2 {
  /**
   * 备注
   */
  comment: string
  /**
   * 日期
   */
  date: string
  /**
   * 名字
   */
  name: string
  /**
   * 价值
   */
  price: number
  /**
   * 隐私设置(0非隐私1隐私)
   */
  privacy: number
  /**
   * 状态
   */
  state: string
  /**
   * 属性(0房屋1空间2物品)
   */
  type: number
  /**
   * 备注图片数组
   */
  figures: imgData[]
  /**
   * 图片数组
   */
  images: imgData[]
  /**
   * 标签数组
   */
  labels: LabelData[]
  /**
   * 密码
   */
  password?: string
}

//图片数据
interface imgData {
  /**
   * ID
   */
  id?: number
  /**
   * 图片链接
   */
  url: string
}

// 标签
export interface LabelData extends T1 {
  /**
   * 颜色
   */
  color?: string
}

// 空间表单
export interface RoomForm extends T2 {
  /**
   * 地址
   */
  address: string
  /**
   * 坐标
   */
  location: string
}

// 物品表单
export interface ItemForm extends T2 {
  /**
   * 父空间名
   */
  fatherName: string
  /**
   * 路径数组
   */
  path: T1[]
  /**
   * 链接
   */
  url: string
  /**
   * 数量
   */
  count: number
  /**
   * 关联物品
   */
  items: RelateItem[]
}

// 关联物品
export interface RelateItem extends T1 {
  /**
   * 图片
   */
  cover: string
}

//历史记录类型
export interface LogData {
  /**
   * 名字
   */
  id: number
  /**
   * 名字
   */
  username: string
  /**
   * 具体内容
   */
  content: string
  /**
   * 日期
   */
  date: number
}

export interface MultipleModify {
  /**
   * 状态
   */
  state: string
  /**
   * 数量
   */
  count: number
  /**
   * 价格
   */
  price: number
  /**
   * 名字
   */
  name: string
  /**
   * 入库日期
   */
  date: string
  /**
   * 隐私设置(0非隐私1隐私)
   */
  privacy: number
  /**
   * 入库日期
   */
  password?: string
}

// 空间信息
export interface LogsInfo {
  /**
   * 当前页
   */
  current: number
  /**
   * 总共页
   */
  pages: number
  /**
   * 每页显示数量
   */
  size: number
  /**
   * 总共数量
   */
  total: number
  /**
   * 空间数据
   */
  logsData: LogData[]
}
