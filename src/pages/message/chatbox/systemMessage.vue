<template>
  <view class="chatbox">
    <u-navbar
      :title="currentMessageList.messageList[currentIndex].username"
      autoBack
      placeholder
      bgColor="#f5f5f5"
      titleStyle="font-weight:bold"
    ></u-navbar>
    <scroll-view class="chatbox__main" :scroll-y="true">
      <view
        v-for="(item, index) in currentMessageList.messageList[currentIndex].message.chatLogList"
        :id="'msg' + item.id"
        :key="index"
        :scroll-into-view="scrollToView"
        :scroll-with-animation="true"
      >
        <!-- 时间  -->
        <view class="chatbox__main__time" v-if="item.time">{{ item.time }}</view>
        <!-- 对方的消息  -->
        <view class="chatbox__main__left">
          <!-- 头像 -->
          <u-image
            :src="currentMessageList.messageList[currentIndex].avatar"
            width="100rpx"
            height="100rpx"
            class="chatbox__main__left__avatar"
          ></u-image>
          <!-- 0 - 文字 -->
          <view class="chatbox__main__left__content">
            <!-- 已失效 -->
            <view v-if="!item.status" class="chatbox__main__left__content__expired">已失效</view>
            <!-- 主体 -->
            <view class="chatbox__main__left__content__content">
              {{ item.content }}
              <view v-if="item.isUpdate" class="chatbox__main__left__content__content__update">
                点击此处更新最新版本
              </view>
            </view>
          </view>
          <!-- 1 - 图片 -->
          <!-- 2 - 语音 -->
          <!-- 3 - 位置信息 -->
        </view>
        <!-- 自己的信息 -->
        <!-- <view class="chatbox__main__right" v-if="item.id === userInfo.id">
          <u-image
            :src="userInfo.avatar"
            width="60rpx"
            height="60rpx"
            class="chatbox__main__right__avatar"
          ></u-image>
          <view class="chatbox__main__right__content" v-if="item.types === 0">
            {{ item.content }}
          </view>
        </view> -->
      </view>
    </scroll-view>
    <!-- <view class="chatbox__input-wrapper" id="inputWrapper">
      <view class="chatbox__input-wrapper__prefixIcon">
        <u-icon name="camera-fill" size="60rpx" color="#fff"></u-icon>
      </view>
      <u-input
        clearable
        adjustPosition
        shape="circle"
        border="none"
        customStyle="
          height: 86rpx;
          padding: 0 20rpx;
          background-color: #fff;
        "
      ></u-input>
      <view class="chatbox__input-wrapper__suffixIcon" @click="sendMsg">
        <u-icon name="checkmark" size="50rpx" color="#fff"></u-icon>
      </view>
    </view> -->
  </view>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'
import { ref, getCurrentInstance } from 'vue'
import type { MessageItem } from '@/types/message'

// const instance = getCurrentInstance()

// const query = uni.createSelectorQuery().in(instance)

// query
//   .select('#inputWrapper')
//   .boundingClientRect((data: any) => {
//     // 88 为顶部 navbar 的高度
//     scrollScreenHeight.value = data.top - 88
//   })
//   .exec()

// 当前用户信息
const user = useUserStore()
const { userInfo } = storeToRefs(user)
// 当前聊天信息
const messageStore = useMessageStore()
const { currentMessageList } = storeToRefs(messageStore)

const currentIndex = ref(0)
onLoad((option: any) => {
  currentIndex.value = option.index
})

// scroll-view 的高度
const scrollScreenHeight = ref(0)
// scroll-view 的滚动距离
const scrollToView = ref('')
// 发送信息
// const sendMsg = () => {
//   nextTick(() => {
//     scrollToView.value =
//       'msg' +
//       currentMessageList.value.messageList[currentIndex.value].message.chatLogList[length - 1].id
//   })
// }
</script>

<style lang="scss" scoped>
.chatbox {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  overflow-x: hidden;

  &__main {
    width: 90vw;
    padding: 0 40rpx 0 40rpx;

    &__time {
      display: flex;
      justify-content: center;
      margin: 35rpx 0 10rpx 0;
      font-size: 26rpx;
      color: $uni-text-color-grey;
    }

    &__left {
      display: flex;
      margin-bottom: 80rpx;
      gap: 20rpx;

      &__content {
        position: relative;
        max-width: 50vw;
        padding: 35rpx 70rpx 35rpx 60rpx;
        margin-top: 30rpx;
        color: #565656;
        background-color: #fff;
        border-radius: 0 30px 30px 30px;

        &__expired {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border-radius: 0 30px 30px 30px;
          font-size: 30rpx;
          font-weight: bold;
          color: #535353;
          background-color: rgba($color: #d9d9d9, $alpha: 0.65);
          z-index: 1;
        }

        &__content {
          font-size: 28rpx;
          line-height: 40rpx;

          &__update {
            font-weight: bold;
            text-decoration: underline;
            color: $uni-theme-color;
          }
        }
      }
    }

    // &__right {
    //   display: flex;
    //   flex-direction: row-reverse;
    //   align-items: center;
    //   margin-bottom: 18rpx;
    //   gap: 20rpx;

    //   &__content {
    //     max-width: 50vw;
    //     background-color: #409eff;
    //     color: #fff;
    //     padding: 20rpx;
    //     border-radius: 30px 30px 0 30px;
    //   }
    // }
  }

  // &__input-wrapper {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   position: fixed;
  //   bottom: 40rpx;
  //   width: 100vw;
  //   height: 60px;
  //   background-color: #f8f8fc;

  //   &__prefixIcon,
  //   &__suffixIcon {
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     width: 84rpx;
  //     height: 84rpx;
  //     background-color: #5790df;
  //     border-radius: 50%;
  //     margin: 0 20rpx 0 20rpx;
  //   }
  // }
}
</style>
