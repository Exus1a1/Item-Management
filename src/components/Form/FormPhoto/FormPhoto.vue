<template>
  <view class="formPhoto">
    <view v-show="tempPhoto[0]" class="formPhoto__swiper">
      <u-swiper
        :list="tempPhoto"
        :height="size"
        autoplay
        indicator
        indicatorMode="line"
        :current="index"
      />
      <view class="formPhoto__swiper-icon">
        <u-icon @click="deletePhoto" size="30rpx" name="close"></u-icon>
      </view>
    </view>
    <view class="formPhoto__upload">
      <u-upload
        @afterRead="photoAfterRead"
        accept="image"
        multiple
        :width="size"
        :height="size"
        :disabled="isDetail"
        :deletable="!isDetail"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import type { imgData } from '@/types/form'
const props = defineProps<{
  //大小
  size: string
  //是否为详情页
  isDetail?: boolean
  //图片列表
  photoList: imgData[]
}>()
//图片列表内容
const tempPhoto = ref(props.photoList)
const emits = defineEmits<{
  //更新图片列表
  (e: 'update:photoList', photoList: imgData[]): void
}>()
const index = ref()
watch(
  () => tempPhoto.value,
  () => {
    emits('update:photoList', tempPhoto.value)
  }
)
//新增图片的回调
const photoAfterRead = (event: any): void => {
  for (let index = 0; index < event.file.length; index++) {
    tempPhoto.value.push({
      url: event.file[index].url
    })
  }
  console.log(props.photoList)
}
//删除图片的回调
const deletePhoto = (index: number): void => {
  tempPhoto.value.splice(index, 1)
}
</script>

<style scoped lang="scss">
.formPhoto {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  &__swiper {
    margin-top: 30rpx;
    width: 300rpx;
    position: relative;
    &-icon {
      position: absolute;
      right: 0;
      top: 0;
      background-color: #f6f6f6;
      opacity: 70%;
    }
  }
  &__upload {
    margin-left: 10rpx;
    margin-top: 30rpx;
    width: 300rpx;
  }
}
</style>
