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
        :scroll-with-animation="true"
      >
        <!-- 时间  -->
        <view class="chatbox__main__time" v-if="item.time">{{ item.time }}</view>
        <!-- 对方的消息  -->
        <view class="chatbox__main__left" v-if="!item.types">
          <!-- 头像 -->
          <u-image
            :src="currentMessageList.messageList[currentIndex].avatar"
            width="100rpx"
            height="100rpx"
            class="chatbox__main__left__avatar"
          ></u-image>

          <view class="chatbox__main__left__content">
            <!-- 已失效 -->
            <view v-if="!item.status" class="chatbox__main__left__content__expired">已失效</view>
            <!-- 主体 -->
            <view class="chatbox__main__left__content__title">{{ item.title }}</view>
            <view class="chatbox__main__left__content__content">{{ item.content }}</view>
            <!-- 图片 -->
            <view class="chatbox__main__left__content__cover">
              <image :src="item.cover" class="chatbox__main__left__content__cover__img"></image>
              <!-- 查看详情 -->
              <view
                class="chatbox__main__left__content__cover__jump iconfont"
                @click="jumpToDetail"
              >
                &#xe617;
              </view>
            </view>
            <!-- 按钮 -->
            <view v-if="!item.isFinished" class="chatbox__main__left__content__button">
              <button class="chatbox__main__left__content__button__refuse" @click="refuse(item)">
                拒绝
              </button>
              <button class="chatbox__main__left__content__button__accept" @click="accept(item)">
                接受
              </button>
            </view>
            <view v-if="item.isFinished" class="chatbox__main__left__content__finish">
              {{ item.isAccept ? '已添加' : '已拒绝' }}
            </view>
          </view>
        </view>
        <!-- 成功提示 -->
        <view v-if="item.isFinished && item.isAccept" class="chatbox__main__check">
          <u-icon name="checkbox-mark" color="#53C649"></u-icon>
          <view class="chatbox__main__check__word">
            接受
            <view style="font-weight: bold">“{{ item.roomName }}”</view>
            共同管理权限成功
          </view>
        </view>

        <!-- 自己的信息 -->
        <view class="chatbox__main__right" v-if="item.types">
          <!-- 头像 -->
          <u-image
            :src="currentMessageList.messageList[currentIndex].avatar"
            width="100rpx"
            height="100rpx"
            class="chatbox__main__right__avatar"
          ></u-image>

          <view class="chatbox__main__right__content">
            <!-- 已失效 -->
            <view v-if="!item.status" class="chatbox__main__right__content__expired">已失效</view>
            <!-- 主体 -->
            <view style="display: flex">
              请求添加
              <view class="chatbox__main__right__content__title">{{ item.title }}</view>
            </view>
            <view class="chatbox__main__right__content__content">{{ item.content }}</view>
            <!-- 图片 -->
            <view class="chatbox__main__right__content__cover">
              <image :src="item.cover" class="chatbox__main__right__content__cover__img"></image>
              <!-- 查看详情 -->
              <view
                class="chatbox__main__right__content__cover__jump iconfont"
                @click="jumpToDetail"
              >
                &#xe617;
              </view>
            </view>
            <!-- 完成状态 -->
            <view v-if="!item.isFinished" class="chatbox__main__right__content__finish">
              等待验证
            </view>
            <view v-if="item.isFinished" class="chatbox__main__right__content__finish">
              {{ item.isAccept ? '已添加' : '已拒绝' }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 当前用户信息
const user = useUserStore()
const { userInfo } = storeToRefs(user)
// 当前聊天信息
const messageStore = useMessageStore()
const { currentMessageList } = storeToRefs(messageStore)

// 点击的消息索引
const currentIndex = ref(0)
onLoad((option: any) => {
  currentIndex.value = option.index
})

const refuse = (item: any) => {
  item.isAccept = false
  item.isFinished = true
}
const accept = (item: any) => {
  item.isAccept = true
  item.isFinished = true
}

const jumpToDetail = () => {
  // uni.navigateTo({
  //   url: '/pages/user/details/details'
  // })
  uni.showModal({
    title: '跳转到物品详情？'
  })
}
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
      margin-bottom: 50rpx;
      gap: 20rpx;

      &__content {
        position: relative;
        max-width: 50vw;
        min-height: 100rpx;
        padding: 35rpx 40rpx 35rpx 60rpx;
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
          font-size: 38rpx;
          font-weight: bold;
          color: #535353;
          background-color: rgba($color: #d9d9d9, $alpha: 0.65);
          z-index: 1;
        }

        &__title {
          font-size: 28rpx;
          font-weight: bold;
          margin-bottom: 15rpx;
        }

        &__content {
          font-size: 26rpx;
          margin-bottom: 15rpx;
        }

        &__button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 320rpx;

          &__refuse {
            width: 120rpx;
            height: 55rpx;
            margin: 0;
            border-radius: 8px;
            color: #979797;
            font-size: 22rpx;
            font-weight: bold;
            background-color: #f2f2f2;
          }

          &__accept {
            width: 120rpx;
            height: 55rpx;
            margin: 0;
            border-radius: 8px;
            color: #fff;
            font-size: 22rpx;
            font-weight: bold;
            background-color: #9cc3ff;
          }
        }

        &__cover {
          display: flex;
          margin-bottom: 30rpx;

          &__img {
            width: 270rpx;
            height: 200rpx;
            border-radius: 12px;
          }

          &__jump {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50rpx;
            height: 200rpx;
            padding-left: 40rpx;
            font-size: 50rpx;
          }
        }

        &__finish {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 95%;
          height: 50rpx;
          font-size: 28rpx;
          color: #979797;
        }
      }
    }

    &__right {
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 18rpx;
      gap: 20rpx;

      &__content {
        position: relative;
        max-width: 50vw;
        min-height: 100rpx;
        padding: 35rpx 40rpx 35rpx 60rpx;
        margin-top: 30rpx;
        color: #565656;
        background-color: #fff;
        border-radius: 30px 0 30px 30px;

        &__expired {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border-radius: 30px 0 30px 30px;
          font-size: 38rpx;
          font-weight: bold;
          color: #535353;
          background-color: rgba($color: #d9d9d9, $alpha: 0.65);
          z-index: 1;
        }

        &__title {
          font-size: 28rpx;
          font-weight: bold;
          margin-bottom: 15rpx;
        }

        &__content {
          font-size: 26rpx;
          margin-bottom: 15rpx;
        }

        &__button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 320rpx;

          &__refuse {
            width: 120rpx;
            height: 55rpx;
            margin: 0;
            border-radius: 8px;
            color: #979797;
            font-size: 22rpx;
            font-weight: bold;
            background-color: #f2f2f2;
          }

          &__accept {
            width: 120rpx;
            height: 55rpx;
            margin: 0;
            border-radius: 8px;
            color: #fff;
            font-size: 22rpx;
            font-weight: bold;
            background-color: #9cc3ff;
          }
        }

        &__cover {
          display: flex;
          margin-bottom: 30rpx;

          &__img {
            width: 270rpx;
            height: 200rpx;
            border-radius: 12px;
          }

          &__jump {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50rpx;
            height: 200rpx;
            padding-left: 40rpx;
            font-size: 50rpx;
          }
        }

        &__finish {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 95%;
          height: 50rpx;
          font-size: 28rpx;
          color: #979797;
        }
      }
    }

    &__check {
      display: flex;
      justify-content: center;
      width: 100%;
      color: #565656;
      font-size: 24rpx;

      &__word {
        display: flex;
      }
    }
  }
}
</style>
