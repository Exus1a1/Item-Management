import service from '..'
import type { PagingParams, Pages } from '@/utils/typings'
import type { T1, BriefItem, DetailItemData, DetailRoomData, PathData } from '@/types/space.d.ts'

// 查看空间列表
export function getAllRooms({ offset, limit = 10 }: PagingParams): Promise<Pages<BriefItem>> {
  return service<Pages<BriefItem>>({
    url: `/items/rooms?offset=${offset}&limit=${limit}`,
    method: 'GET'
  })
}

// 查看某个空间中的物品
export function getRoomItems(
  // 要查询的空间 id
  itemId: number,
  { offset, limit = 10 }: PagingParams
): Promise<Pages<BriefItem>> {
  return service<Pages<BriefItem>>({
    url: `/items/${itemId}/items?offset=${offset}&limit=${limit}`,
    method: 'GET'
  })
}

// 查看空间详情
export function getRoomDetail(id: number, password: string): Promise<DetailRoomData> {
  return service<DetailRoomData>({
    url: `/items/rooms/${id}?password=${password}`,
    method: 'GET'
  })
}

// 查看物品详情
export function getItemDetail(id: number, password: string): Promise<DetailItemData> {
  return service<DetailItemData>({
    url: `/items/${id}?password=${password}`,
    method: 'GET'
  })
}

// 获取所有路径
export function getAllPath(): Promise<PathData[][]> {
  return service<PathData[][]>({
    url: `/items/path`,
    method: 'GET'
  })
}

// 移动物品
export function moveItem(fatherId: number, ids: number[], path: T1[]): Promise<null> {
  return service<null>({
    url: `/items/${fatherId}/move`,
    method: 'PUT',
    data: {
      ids,
      path
    }
  })
}
