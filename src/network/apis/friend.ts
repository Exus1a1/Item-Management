import service from '..'
import type { PagingParams, Pages, T1 } from '@/utils/typings'
import type { Friends, Friend } from '@/types/friend'

// 获取好友分组
export function getAllGroups({
  offset,
  limit = 10
}: PagingParams): Promise<Pages<{ id: number; name: string }>> {
  return service<Pages<{ id: number; name: string }>>({
    url: `/groups?offset=${offset}&limit=${limit}`,
    method: 'GET'
  })
}

// 删除分组
export function addUserGroup(name: string): Promise<T1> {
  return service({
    url: `/groups`,
    method: 'POST',
    data: name
  })
}

// 删除分组
export function deleteUserGroup(id: number): Promise<null> {
  return service({
    url: `/groups/${id}`,
    method: 'DELETE'
  })
}

// 删除分组
export function changeUserGroup(id: number, name: string): Promise<T1> {
  return service({
    url: `/groups/${id}`,
    method: 'PUT',
    data: name
  })
}

// 添加好友Friend
export function addUserFriend(groupId: number, id: number, note?: string): Promise<T1> {
  return service({
    url: `/friends/${id}/${groupId}`,
    method: 'POST',
    data: note
  })
}

// 添加好友
export function getAllFriends(): Promise<Friends[]> {
  return service({
    url: `/friends`,
    method: 'GET'
  })
}

//搜索用户
export function searchUser(id: number): Promise<Friend> {
  return service({
    url: `/friends/search/${id}`,
    method: 'GET'
  })
}

//移动好友分组
export function moveUserFriend(groupId: number, ids: number[]): Promise<null> {
  return service({
    url: `/friends/move/${groupId}`,
    method: 'PUT',
    data: ids
  })
}

export function changeFriendNotes(id: number, notes: string): Promise<null> {
  return service({
    url: `/friends/${id}?notes=${notes}`,
    method: 'PUT'
  })
}
