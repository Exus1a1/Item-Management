import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  addUserGroup,
  getAllGroups,
  deleteUserGroup,
  changeUserGroup,
  addUserFriend,
  getAllFriends,
  searchUser,
  moveUserFriend,
  changeFriendNotes
} from '@/network/apis/friend'
import type { Friends, Friend, GroupList } from '@/types/friend'

export const useGroupStore = defineStore('group', () => {
  const groupInfo = reactive<GroupList>({
    current: 0,
    total: 100,
    pages: 0,
    size: 0,
    groupsData: []
  })

  //获取所有分组
  async function fetchAllGroups() {
    groupInfo.groupsData = []
    do {
      const data = await getAllGroups({
        offset: groupInfo.groupsData.length / 100 + 1
      })
      groupInfo.groupsData.push(...data.records)
      groupInfo.total = data.total
    } while (groupInfo.groupsData.length < groupInfo.total)
  }

  //添加分组
  async function addGroup(name: string) {
    await addUserGroup(name)
  }

  //删除分组
  async function deleteGroup(id: number) {
    await deleteUserGroup(id)
  }

  //修改分组
  async function changeGroup(id: number, name: string) {
    await changeUserGroup(id, name)
  }

  return {
    groupInfo,
    addGroup,
    deleteGroup,
    fetchAllGroups,
    changeGroup
  }
})

export const useFriendStore = defineStore('friend', () => {
  async function addFriend(userId: number, groupId: number) {
    await addUserFriend(groupId, userId)
  }
  const friends = ref<Friends[]>([])

  const group = ref({
    id: 0,
    name: ''
  })

  const friend = ref<Friend>({
    id: 0,
    notes: '',
    name: '',
    userId: 0,
    avatar: '',
    qrCode: ''
  })

  async function fetchAllFriends() {
    friends.value = await getAllFriends()
  }

  async function searchFriend(id: number) {
    return await searchUser(id)
  }

  async function moveFriend(groupId: number, ids: number[]) {
    await moveUserFriend(groupId, ids)
  }

  async function changeNotes(id: number, notes: string) {
    await changeFriendNotes(id, notes)
  }

  // 批量移动分组id数组
  const moveIds = ref<number[]>([])

  return {
    addFriend,
    fetchAllFriends,
    friends,
    searchFriend,
    moveIds,
    moveFriend,
    friend,
    group,
    changeNotes
  }
})
