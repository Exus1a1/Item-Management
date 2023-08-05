<template>
  <view class="formHistory">
    <view class="formHistory__user">
      <text class="formHistory__user-username">{{ history.username }}</text>
      <u-text lines="1" size="22rpx" :text="history.content" />
    </view>
    <u-text align="right" color="#aaadb7" :text="history.date" />
  </view>
  <u-line customStyle="margin:0 auto" direction="row" length="80%"></u-line>
</template>

<script setup lang="ts">
import type { LogData } from '@/types/form'
defineProps<{
  //历史记录
  history: LogData
}>()
</script>

<style lang="scss" scoped>
.formHistory {
  display: flex;

  &__user {
    display: flex;
    width: 70%;

    &-username {
      margin-right: 20rpx;
    }
  }
}
</style>
