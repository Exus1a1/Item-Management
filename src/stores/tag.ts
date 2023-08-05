import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getAllTags, addTag, deleteTag, changeTag } from '@/network/apis/tag'

export const useTagStore = defineStore('tag', () => {
  const tagInfo = reactive<any>({
    current: 0,
    total: 100,
    pages: 0,
    size: 0,
    tagData: []
  })

  //获取所有标签
  async function fetchAllTags() {
    tagInfo.tagData = []
    do {
      const data = await getAllTags({
        offset: tagInfo.tagData.length / 100 + 1
      })
      tagInfo.tagData.push(...data.records)
      tagInfo.total = data.total
    } while (tagInfo.tagData.length < tagInfo.total)
  }

  //添加标签
  async function fetchAddTag(name: string, color: string) {
    await addTag(name, color)
  }

  //删除标签
  async function fetchDeleteTag(id: number) {
    await deleteTag(id)
  }

  //删除标签
  async function fetchChangeTag(id: number, name: string, color: string) {
    await changeTag(id, name, color)
  }

  return {
    tagInfo,
    fetchDeleteTag,
    fetchAddTag,
    fetchAllTags,
    fetchChangeTag
  }
})
