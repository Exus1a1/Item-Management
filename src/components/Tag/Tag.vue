<template>
  <view class="tag">
    <view class="tag__name">
      <u-input @blur="blur" @focus="focus" border="none" type="text" v-model="name" />
    </view>
    <view class="tag__icon">
      <view
        v-if="showColor"
        @click="changeColor"
        :style="`background-color:${color}`"
        class="tag__icon-color"
      />
      <view class="tag__icon-close">
        <u-icon @click="deleteTag" size="30rpx" color="#fff" name="close"></u-icon>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { Tag } from '@/utils/typings'
import { ref, watch } from 'vue'
const emits = defineEmits<{
  //点击事件
  (e: 'deleteTag'): void
  (e: 'changeColor'): void
  (e: 'focus', id: number, name: string, index: number): void
  (e: 'blur', name: string): void
}>()
const props = defineProps<{
  //标签
  tag: Tag
  //显示颜色
  showColor: boolean
  //索引
  index: number
}>()
const color = ref(props.tag.color)
const name = ref(props.tag.name)
const deleteTag = (): void => {
  emits('deleteTag')
}
const changeColor = (): void => {
  emits('changeColor')
}
const focus = (): void => {
  emits('focus', props.tag.id, name.value, props.index)
}
const blur = (): void => {
  emits('blur', name.value)
}
watch(
  () => props.tag.name,
  () => {
    name.value = props.tag.name
  }
)
</script>

<style lang="scss" scoped>
.tag {
  margin-top: 10px;
  box-sizing: border-box;
  position: relative;
  font-size: 30rpx;
  font-weight: 750;
  padding: 30rpx;
  color: #353535;
  margin-bottom: 10rpx;
  background-color: #fff;
  border-radius: 20rpx;
  height: 100rpx;
  width: 750rpx;

  &__name {
    width: 500rpx;
  }

  &__icon {
    display: flex;
    justify-content: space-around;
    position: absolute;
    right: 0;
    top: 0;
    align-items: center;
    height: 100rpx;
    width: 180rpx;

    &-color {
      width: 50rpx;
      height: 50rpx;
      border-radius: 25rpx;
      border: 1px solid #979797;
      margin-top: 7rpx;
    }

    &-close {
      width: 50rpx;
      height: 50rpx;
      border-radius: 25rpx;
      background-color: #979797;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 6rpx;
    }
  }
}
</style>
