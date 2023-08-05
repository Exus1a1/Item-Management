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

          <view class="chatbox__main__left__content" @click="jumpToDetail(item)">
            <!-- 已失效 -->
            <view v-if="!item.status" class="chatbox__main__left__content__expired">已失效</view>
            <!-- 主体 -->
            <view class="chatbox__main__left__content__title">{{ item.title }}</view>
            <view class="chatbox__main__left__content__content">{{ item.content }}</view>
            <image :src="item.cover" class="chatbox__main__left__content__cover"></image>
            <view class="chatbox__main__left__content__room-name">
              <view>{{ item.roomName }}</view>
            </view>
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
            <view class="chatbox__main__right__content__title">{{ item.title }}</view>
            <view class="chatbox__main__right__content__content">{{ item.content }}</view>
            <image :src="item.cover" class="chatbox__main__right__content__cover"></image>
            <view class="chatbox__main__right__content__room-name">
              <view>{{ item.roomName }}</view>
            </view>
          </view>
        </view>
        <PasswordPopup
          :popup="popup"
          @close="popup = false"
          @confirmGesture="confirmGesture"
          @confirmNumber="confirmNumber"
          :isValidate="true"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { useUserStore } from '@/stores/user'
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 当前用户信息
const user = useUserStore()
const { userInfo } = storeToRefs(user)
// 表单信息
const useForm = useFormStore()
const { fetchItemDetail, fetchRoomDetail } = useForm
// 当前聊天信息
const messageStore = useMessageStore()
const { currentMessageList } = storeToRefs(messageStore)

const currentIndex = ref(0)
onLoad((option: any) => {
  currentIndex.value = option.index
})

//密码弹窗
const popup = ref(false)
const tempID = ref(0)
const tempType = ref(0)
async function setID(id: number, type: number, privacy: number): Promise<void> {
  if (privacy) {
    tempID.value = id
    tempType.value = type
    popup.value = true
  } else {
    if (type) await fetchItemDetail(id, '')
    else await fetchRoomDetail(id, '')
    uni.navigateTo({
      url: `/pages/details/details`
    })
  }
}

//验证手势密码
async function confirmGesture(password: string) {
  popup.value = false
  if (tempType.value) await fetchItemDetail(tempID.value, password)
  else await fetchRoomDetail(tempID.value, password.toString())
  uni.navigateTo({
    url: `/pages/details/details`
  })
}
//验证数字密码
async function confirmNumber(password: string) {
  popup.value = false
  if (tempType.value) await fetchItemDetail(tempID.value, password)
  else await fetchRoomDetail(tempID.value, password.toString())
  uni.navigateTo({
    url: `/pages/details/details`
  })
}

const jumpToDetail = (item: any) => {
  setID(item.id, item.type, item.privacy)
  if (item.type) fetchItemDetail(item.id, '')
  else fetchRoomDetail(item.id, '')
  uni.navigateTo({
    url: `/pages/details/details`
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
      margin-bottom: 80rpx;
      gap: 20rpx;

      &__content {
        position: relative;
        max-width: 45vw;
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
          font-size: 40rpx;
          font-weight: bold;
          color: #535353;
          background-color: rgba($color: #d9d9d9, $alpha: 0.65);
          z-index: 1;
        }

        &__title {
          font-size: 30rpx;
          font-weight: bold;
          margin-bottom: 5rpx;
        }

        &__content {
          font-size: 26rpx;
          margin-bottom: 15rpx;
        }

        &__cover {
          width: 350rpx;
          height: 250rpx;
          border-radius: 12px;
        }

        &__room-name {
          position: absolute;
          left: 60rpx;
          bottom: 42rpx;
          display: flex;
          align-items: center;
          width: 330rpx;
          height: 55rpx;
          border-radius: 0 0 12px 12px;
          padding-left: 20rpx;
          font-size: 24rpx;
          color: #fff;
          background-color: rgba($color: #353535, $alpha: 0.58);
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
        max-width: 45vw;
        padding: 35rpx 70rpx 35rpx 60rpx;
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
          font-size: 40rpx;
          font-weight: bold;
          color: #535353;
          background-color: rgba($color: #d9d9d9, $alpha: 0.65);
          z-index: 1;
        }

        &__title {
          font-size: 30rpx;
          font-weight: bold;
          margin-bottom: 5rpx;
        }

        &__content {
          font-size: 26rpx;
          margin-bottom: 15rpx;
        }

        &__cover {
          width: 350rpx;
          height: 250rpx;
          border-radius: 12px;
        }

        &__room-name {
          position: absolute;
          left: 60rpx;
          bottom: 42rpx;
          display: flex;
          align-items: center;
          width: 330rpx;
          height: 55rpx;
          border-radius: 0 0 12px 12px;
          padding-left: 20rpx;
          font-size: 24rpx;
          color: #fff;
          background-color: rgba($color: #353535, $alpha: 0.58);
        }
      }
    }
  }
}
</style>
