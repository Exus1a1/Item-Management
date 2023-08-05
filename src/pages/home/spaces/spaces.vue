<template>
  <view class="spaces">
    <u-navbar @leftClick="back" titleWidth="250rpx" :title="name" bgColor="#F5F5F5" />
    <Space />
  </view>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/form'
const name = useFormStore().currentName

// 节流函数
function throttle(func: () => void, delay: number): () => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastExecTime = 0

  return function () {
    const currentTime = Date.now()
    const elapsedTime = currentTime - lastExecTime

    if (elapsedTime > delay) {
      func()
      lastExecTime = currentTime
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(func, delay - elapsedTime)
    }
  }
}

const back = () => {
  useFormStore().currentFloor--
  // uni.navigateBack()
  throttle(uni.navigateBack, 1000)()
}
</script>
