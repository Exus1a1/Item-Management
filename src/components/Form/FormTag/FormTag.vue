<template>
  <view class="formTag" :style="tagSize(tag.name.length)">
    <u-tag
      :shape="shape"
      :borderColor="tag.color"
      :bgColor="checked ? tag.color : '#fff'"
      :text="tag.name"
      :plain="!checked"
      :color="checked ? '#fff' : tag.color"
      @click="tagClick"
    />
  </view>
</template>

<script setup lang="ts">
import type { LabelData } from '@/types/form'

defineProps<{
  //标签
  tag: LabelData
  //形状
  shape: string
  //是否被选中
  checked: boolean
}>()

const emits = defineEmits<{
  //触发点击事件
  (e: 'click', name: number): void
}>()
const tagClick = (name: number): void => {
  emits('click', name)
}
//标签大小
const tagSize = (length: number): string => {
  if (length > 5) return '80px'
  return `width:${length * 15 + 18}px;`
}
</script>

<style scoped lang="scss">
.formTag {
  margin: 0 10rpx 10rpx 0;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
