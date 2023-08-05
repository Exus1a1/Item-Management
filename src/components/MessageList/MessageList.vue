<template>
  <template>
    <u-skeleton rows="16" :loading="isLoading" title animate class="message-list">
      <view v-if="!isLoading">
        <!-- 总列表 -->
        <template v-if="!isEmpty">
          <view v-for="(item, index) in currentMessageList.messageList" :key="index">
            <MessageItem :message-data="item" @onClick="chooseMessage(index)" />
          </view>
        </template>
      </view>
    </u-skeleton>
  </template>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { MessageItem } from '@/types/message'

const searchStore = useMessageStore()
const { currentMessageList } = storeToRefs(searchStore)

// 是否正在加载
const isLoading = ref(false)
// 是否为空
const isEmpty = ref(false)

// 点击消息进入聊天界面
const chooseMessage = (index: number) => {
  switch (index) {
    case 0:
      uni.navigateTo({
        url: `/pages/message/chatbox/systemMessage?index=${index}`
      })
      break
    case 1:
      uni.navigateTo({
        url: `/pages/message/chatbox/friendApplications?index=${index}`
      })
      break
    case 2:
      uni.navigateTo({
        url: `/pages/message/chatbox/managingApplications?index=${index}`
      })
      break
    case 3:
      uni.navigateTo({
        url: `/pages/message/chatbox/itemShare?index=${index}`
      })
      break

    default:
      break
  }
}
</script>

<style lang="scss">
.message-list {
  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2300rpx;
    letter-spacing: 2rpx;
    color: $uni-text-color-grey;

    &__text {
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
