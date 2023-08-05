import service from '..'
import type { ItemForm, RoomForm, LogData, MultipleModify } from '@/types/form.d.ts'
import type { DetailItemData, DetailRoomData } from '@/types/space.d.ts'
import type { Pages } from '@/utils/typings'
import type { PagingParams } from '@/utils/typings'
import { uploadFileService } from '..'

// 添加房间
export function addRoom({
  privacy,
  type,
  price,
  name,
  state,
  address,
  location,
  comment,
  date,
  labels,
  images,
  figures,
  password
}: RoomForm): Promise<DetailRoomData> {
  return service<DetailRoomData>({
    url: '/items/rooms',
    method: 'POST',
    data: {
      privacy,
      type,
      price,
      name,
      state,
      address,
      location,
      comment,
      date,
      labels,
      images,
      figures,
      password
    }
  })
}

// 添加空间中的空间或物品
export function addItem(
  id: number,
  {
    privacy,
    type,
    price,
    name,
    state,
    comment,
    date,
    fatherName,
    url,
    path,
    labels,
    count,
    images,
    figures,
    password,
    items
  }: ItemForm
): Promise<DetailItemData> {
  return service<DetailItemData>({
    url: `/items/${id}/items`,
    method: 'POST',
    data: {
      privacy,
      type,
      price,
      name,
      state,
      comment,
      date,
      fatherName,
      url,
      path,
      labels,
      count,
      images,
      figures,
      password,
      items
    }
  })
}

// 更新房间
export function updateRoom(
  id: number,
  {
    privacy,
    type,
    price,
    name,
    state,
    address,
    location,
    comment,
    date,
    labels,
    images,
    figures,
    password
  }: RoomForm
): Promise<DetailRoomData> {
  return service<DetailRoomData>({
    url: `/items/rooms/${id}`,
    method: 'PUT',
    data: {
      privacy,
      type,
      price,
      name,
      state,
      address,
      location,
      comment,
      date,
      labels,
      images,
      figures,
      password
    }
  })
}

// 更新空间中的空间或物品
export function updateItem(
  fatherId: number,
  id: number,
  {
    privacy,
    type,
    price,
    name,
    state,
    comment,
    date,
    fatherName,
    url,
    path,
    labels,
    count,
    images,
    figures,
    password,
    items
  }: ItemForm
): Promise<DetailItemData> {
  return service<DetailItemData>({
    url: `/items/${fatherId}/items/${id}`,
    method: 'PUT',
    data: {
      privacy,
      type,
      price,
      name,
      state,
      comment,
      date,
      fatherName,
      url,
      path,
      labels,
      count,
      images,
      figures,
      password,
      items
    }
  })
}

// 获取物品日志
export function getItemLogs(
  id: number,
  { offset, limit = 100 }: PagingParams
): Promise<Pages<LogData>> {
  return service<Pages<LogData>>({
    url: `/items/${id}/logs?offset=${offset}&limit=${limit}`,
    method: 'GET'
  })
}

// 上传图片
export function uploadImg(imgUrl: string): Promise<{
  id: number
  url: string
}> {
  return uploadFileService<{
    id: number
    url: string
  }>({
    url: `/items/upload/image`,
    filePath: imgUrl,
    name: 'image'
  })
}

// 上传备注图片
export function uploadFigure(imgUrl: string): Promise<{
  id: number
  url: string
}> {
  return uploadFileService<{
    id: number
    url: string
  }>({
    url: `/items/upload/figure`,
    filePath: imgUrl,
    name: 'image'
  })
}

// 批量修改物品
export function multipleModifyItem(
  ids: number[],
  { state, count, price, name, date, privacy, password }: MultipleModify
): Promise<null> {
  return service<null>({
    url: `/items/modify`,
    method: 'PUT',
    data: {
      ids,
      state,
      count,
      price,
      name,
      date,
      privacy,
      password
    }
  })
}

// 批量删除物品
export function multipleDeleteItem(ids: number[]): Promise<null> {
  return service<null>({
    url: `/items/delete/0`,
    method: 'DELETE',
    data: ids
  })
}
