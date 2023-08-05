<template>
  <view class="empty">
    <image :src="emptyUrl" :style="{ width: width + 'rpx', height: height + 'rpx' }"></image>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    type: 'space' | 'search' | 'deleted' | 'history'
    width?: number
    height?: number
  }>(),
  {
    width: 350,
    height: 440
  }
)

const emptyUrl = ref('../../static/empty.png')

switch (props.type) {
  case 'space':
    emptyUrl.value = '../../static/empty.png'
    break
  case 'search':
    emptyUrl.value = '../../static/searchEmpty.png'
    break
  case 'deleted':
    emptyUrl.value = '../../static/deletedEmpty.png'
    break
  case 'history':
    emptyUrl.value = '../../static/historyEmpty.png'
    break
}
</script>

<style lang="scss">
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32%;
}
</style>
