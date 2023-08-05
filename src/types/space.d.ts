import type { RelateItem } from './form'
// 通用类型
export interface T1 {
  /**
   * 名字
   */
  name: string
  /**
   * ID
   */
  id: number
}

// 空间物品详情通用类型
interface T2 {
  /**
   * 数量
   */
  count: number
  /**
   * 价格
   */
  price: number
  /**
   * 状态
   */
  state: string
  /**
   * 备注
   */
  comment: string
  /**
   * 二维码
   */
  qrCode: string
  /**
   * 图片链接数组
   */
  images: imageData[]
  /**
   * 备注图片链接数组
   */
  figures: imageData[]
}

// 图片
export interface imageData {
  /**
   * id
   */
  id: number
  /**
   * 链接
   */
  url: string
}

// 标签
export interface LabelData extends T1 {
  /**
   * 颜色
   */
  color: string
}

// 路径
export interface PathData extends T1 {
  /**
   * 父空间ID
   */
  fatherId: number
  /**
   * 层级
   */
  layer: number
}

// 物品
export interface ItemData extends T1 {
  /**
   * 封面
   */
  cover: string
  /**
   * 日期
   */
  date: string
  /**
   * 内容物封面数组
   */
  itemCover: string[]
  /**
   * 隐私权
   */
  privacy: number
  /**
   * 类型:0房子1空间2物品
   */
  type: number
}

// 空间
export interface RoomData extends ItemData {
  /**
   * 地址
   */
  address: string
}

// 物品详情
export interface DetailItemData extends ItemData, T2 {
  /**
   * 父空间名字
   */
  fatherName: string
  /**
   * 标签数组
   */
  labels: LabelData[]
  /**
   * 关联物品
   */
  items: RelateItem[]
  /**
   * 所属路径
   */
  path: PathData[]
  /**
   * 链接
   */
  url: string
}

// 空间详情
export interface DetailRoomData extends RoomData, T2 {}

// 简短空间数据
export interface BriefItem extends T1 {
  /**
   * 地址(房屋才有)
   */
  address?: string
  /**
   * 房间封面
   */
  cover: string
  /**
   * 日期
   */
  date: string
  /**
   * 内部物品封面
   */
  itemCover: string[]
  /**
   * 隐私设置(0非隐私1隐私)
   */
  privacy: number
  /**
   * 属性(0房屋1空间2物品)
   */
  type: number
}

// 空间信息
export interface SpaceInfo {
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
  spaceData: BriefItem[]
}
