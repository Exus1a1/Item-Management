<template>
  <view>
    <u-navbar
      bgColor="transparent"
      placeholder
      title="设置"
      titleStyle="font-weight:bold"
      autoBack
    ></u-navbar>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
  uni.showToast({
    title: '该功能尚未开放',
    icon: 'error'
  })
  setTimeout(() => {
    uni.switchTab({
      url: '/pages/user/user'
    })
  }, 1500)
})
</script>

<style lang="scss" scoped></style>
