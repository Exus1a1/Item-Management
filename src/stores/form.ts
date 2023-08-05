import type { RoomForm, ItemForm, MultipleModify, LogsInfo } from '@/types/form'
import type { DetailItemData } from '@/types/space'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getRoomDetail, getItemDetail } from '@/network/apis/space'
import {
  addRoom,
  addItem,
  uploadImg,
  getItemLogs,
  updateRoom,
  updateItem,
  uploadFigure,
  multipleModifyItem,
  multipleDeleteItem
} from '@/network/apis/form'
export const useFormStore = defineStore('form', () => {
  //物品数据
  const itemData = reactive<DetailItemData>({
    id: 0,
    images: [],
    figures: [],
    type: 1,
    name: '',
    qrCode: '',
    privacy: 0,
    labels: [],
    items: [],
    count: 0,
    price: 0,
    date: '',
    url: '',
    state: '',
    path: [],
    comment: '',
    fatherName: '',
    cover: '',
    itemCover: []
  })
  //日志数据
  const logsInfo = ref<LogsInfo>({
    current: 0,
    total: 10,
    pages: 0,
    size: 0,
    logsData: []
  })
  //获取物品日志
  async function fetchItemLogs(id: number) {
    logsInfo.value.logsData = (await getItemLogs(id, { offset: 0 })).records
  }
  //获取空间详情
  async function fetchRoomDetail(id: number, password: string): Promise<void> {
    const data = await getRoomDetail(id, password)
    Object.assign(itemData, data)
  }
  //获取空间内的空间或物品详情
  async function fetchItemDetail(id: number, password: string) {
    const data = await getItemDetail(id, password)
    Object.assign(itemData, data)
  }

  //当前物品或空间id
  const currentId = ref(0)
  //当前层数
  const currentFloor = ref(0)
  //当前名
  const currentName = ref('')
  //添加空间
  async function submitRoom(roomForm: RoomForm) {
    return await addRoom(roomForm)
  }
  async function submitItem(fatherId: number, itemForm: ItemForm) {
    return await addItem(fatherId, itemForm)
  }
  //上传图片
  async function addImg(url: string) {
    return await uploadImg(url)
  }
  // 上传备注
  async function addFigure(url: string) {
    return await uploadFigure(url)
  }

  //更新空间内的物品或空间数据
  async function updateItemData(fatherId: number, id: number, itemForm: ItemForm) {
    return await updateItem(fatherId, id, itemForm)
  }
  //更新空间数据
  async function updateRoomData(id: number, roomForm: RoomForm) {
    return await updateRoom(id, roomForm)
  }

  //多选物品id
  const ids = <number[]>[]
  //多选编辑物品或空间
  async function changeModifyItem(ids: number[], form: MultipleModify) {
    await multipleModifyItem(ids, form)
  }
  //多选删除物品或空间
  async function modifyDeleteItemData(ids: number[]): Promise<void> {
    await multipleDeleteItem(ids)
  }

  return {
    itemData,
    logsInfo,
    fetchItemLogs,
    fetchRoomDetail,
    fetchItemDetail,
    currentId,
    currentFloor,
    currentName,
    addImg,
    addFigure,
    submitRoom,
    submitItem,
    updateRoomData,
    updateItemData,
    ids,
    changeModifyItem,
    modifyDeleteItemData
  }
})
