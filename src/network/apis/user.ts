import service from '..'
import { uploadFileService } from '../index'
import type { UserInfo } from '@/types/user'
import type { ResponseHistoryList } from '@/types/search.d.ts'
import type { PagingParams } from '@/utils/typings'

export function getUserInfo(): Promise<UserInfo> {
  return service({
    url: '/users',
    method: 'GET'
  })
}

export function changeUserAvatar(filePath: string): Promise<UserInfo> {
  return uploadFileService({
    url: '/users/avatar',
    name: 'avatar',
    filePath
  })
}

export function changeUserName(name: string): Promise<UserInfo> {
  return service({
    url: `/users/name?name=${name}`,
    method: 'PUT'
  })
}

// 恢复删除物品
export function reloadDeletedItems(itemIds: number[]): Promise<null> {
  return service({
    url: `/items/restore`,
    method: 'PUT',
    data: itemIds
  })
}

// 获取历史记录
export function getAllHistory(
  { offset, limit = 10 }: PagingParams,
  name: string
): Promise<ResponseHistoryList> {
  return service({
    url: `/items/logs?name=${name}&offset=${offset}&limit=${limit}`
  })
}
