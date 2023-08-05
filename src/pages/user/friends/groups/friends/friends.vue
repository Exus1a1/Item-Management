<template>
  <view class="friends">
    <u-navbar
      bgColor="transparent"
      placeholder
      title="好友"
      titleStyle="font-weight:bold"
      autoBack
    ></u-navbar>
    <view class="friends__search-input">
      <view class="friends__search-input__content">
        <u-search
          placeholder="搜索好友"
          placeholderColor="#979797"
          searchIconColor="#565b6d"
          searchIconSize="52rpx"
          v-model="inputBox"
          :showAction="false"
          shape="square"
          height="80rpx"
          bgColor="#F8F9FD"
        ></u-search>
        <view class="friends__search-input__content__confirm" @click="submitSearch">
          <span>搜索</span>
        </view>
      </view>
    </view>
    <view
      v-for="(group, index1) in groupStore.groupInfo.groupsData"
      :key="index1"
      class="friends__group"
    >
      <u-text
        @click="showFriendsBox[index1] = !showFriendsBox[index1]"
        :suffixIcon="showFriendsBox[index1] ? 'arrow-down' : 'arrow-right'"
        :text="`${group.name}&nbsp;&nbsp;`"
        size="35rpx"
        bold
      ></u-text>
      <view v-show="showFriendsBox[index1]">
        <view
          @click="item.checked = !item.checked"
          v-for="(item, index2) in testFriends[index1]"
          :key="index2"
          class="friends__group__item"
        >
          <u-avatar size="75rpx" :src="item.avatar"></u-avatar>
          <view class="friends__group__item__information">
            <u-text color="#353535" :text="item.name"></u-text>
            <u-line color="rgba(255,255,255,0)" margin="5rpx 0"></u-line>
            <u-text color="#a4a4a4" size="20rpx" :text="`id: ${item.id}`"></u-text>
          </view>
          <view
            :style="`background-color:${item.checked ? `#3988ff` : `#fff`}`"
            class="friends__group__item__tick"
          >
            <u-icon v-if="item.checked" color="#fff" name="checkbox-mark"></u-icon>
          </view>
        </view>
      </view>
    </view>

    <view class="friends__submit">
      <u-button @click="submit" type="primary" text="确认"></u-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGroupStore } from '@/stores/friend'
const groupStore = useGroupStore()
const inputBox = ref('1111')
const submitSearch = () => {
  console.log(inputBox.value)
}
const testFriends = ref<
  {
    name: string
    id: number
    avatar: string
    checked?: boolean
  }[][]
>([
  [
    { name: '张三', id: 1, avatar: 'https://t.mwm.moe/pc' },
    { name: '张三', id: 1, avatar: 'https://t.mwm.moe/pc' }
  ],
  [
    { name: '李四', id: 2, avatar: 'https://t.mwm.moe/pc' },
    { name: '张三', id: 1, avatar: 'https://t.mwm.moe/pc' }
  ],
  [
    { name: '王五', id: 3, avatar: 'https://t.mwm.moe/pc' },
    { name: '张三', id: 1, avatar: 'https://t.mwm.moe/pc' }
  ],
  [
    { name: '赵六', id: 4, avatar: 'https://t.mwm.moe/pc' },
    { name: '张三', id: 1, avatar: 'https://t.mwm.moe/pc' }
  ],
  [
    { name: '田七', id: 5, avatar: 'https://t.mwm.moe/pc' },
    { name: '张三', id: 1, avatar: 'https://t.mwm.moe/pc' }
  ]
])
for (let i = 0; i < testFriends.value.length; i++) {
  for (let j = 0; j < testFriends.value[i].length; j++) {
    testFriends.value[i][j].checked = false
  }
}
const showFriendsBox = ref([true, false, false, false, false])
const submit = () => {
  uni.showToast({
    title: '提交成功',
    icon: 'success',
    duration: 2000
  })
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.friends {
  padding-bottom: 200rpx;
  &__search-input {
    display: flex;
    width: 700rpx;
    padding: 0 10rpx 0 0;
    margin: 6rpx 0 30rpx 40rpx;

    &__content {
      position: relative;
      display: flex;
      align-items: center;
      width: 700rpx;
      height: 80rpx;
      margin-right: 20rpx;

      &__confirm {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: -30rpx;
        width: 100rpx;
        height: 72%;
        border-radius: 10px;
        font-size: 14px;
        color: #fff;
        background-color: #76acfc;
        transform: translateX(-50%);
        z-index: 999;
      }
    }
  }
  &__group {
    margin-top: 25rpx;
    margin-left: 40rpx;
    &__item {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      &__information {
        margin-left: 20rpx;
        width: 525rpx;
      }
      &__tick {
        width: 30rpx;
        height: 30rpx;
        border-radius: 15rpx;
        border: solid 1px #e6e6e6;
      }
    }
  }
  &__submit {
    position: fixed;
    display: flex;
    bottom: 75rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 258rpx;
    border-radius: 26rpx;
  }
}

:deep(.u-search__content) {
  border-radius: 10px !important;
}
</style>
