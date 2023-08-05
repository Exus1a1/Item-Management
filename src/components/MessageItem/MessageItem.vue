<template>
  <view class="message-item" @click="onClick">
    <view class="message-item__avatar">
      <u-image :src="messageData.avatar" width="120rpx" height="120rpx" radius="50%"></u-image>
    </view>
    <view class="message-item__info">
      <view class="message-item__info__username">{{ messageData.username }}</view>
      <view class="message-item__info__time">{{ messageData.content }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { MessageItem } from '@/types/message'
const props = defineProps<{
  // 消息列表
  messageData: MessageItem
}>()
const emits = defineEmits<{
  (e: 'onClick'): void
}>()
const onClick = () => {
  emits('onClick')
}
</script>

<style lang="scss">
.message-item {
  display: flex;
  align-items: center;
  width: 100vw;
  padding-left: 70rpx;
  height: 170rpx;
  background-color: #fcfcfe;
  margin-top: 14rpx;
  border-bottom: 1px solid #dae1ff;

  &__avatar {
    display: flex;
    align-items: center;
    margin-right: 30rpx;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 60%;

    &__username {
      font-size: 30rpx;
      font-weight: bold;
    }

    &__time {
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style>
