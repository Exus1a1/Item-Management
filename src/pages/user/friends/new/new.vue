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
    <view v-if="user.id" class="friends__new">
      <u-avatar @click="toDetail" size="75rpx" :src="user.avatar"></u-avatar>
      <view @click="toDetail" class="friends__new__information">
        <u-text color="#353535" :text="user.name"></u-text>
        <u-line color="rgba(255,255,255,0)" margin="5rpx 0"></u-line>
        <u-text color="#a4a4a4" size="20rpx" :text="`id: ${user.id}`"></u-text>
      </view>
      <view v-if="!isFriend" @click="showGroup = true" class="friends__new__confirm">
        <u-text color="#3988ff" size="26rpx" align="center" text="加好友"></u-text>
      </view>
    </view>
    <u-popup :safeAreaInsetBottom="false" round="20rpx" mode="bottom" :show="showGroup">
      <view class="friends__popup">
        <view class="friends__popup__title">
          <u-row>
            <u-col span="11">
              <u-text bold size="35rpx" :text="'选择分组'" />
            </u-col>
            <u-col span="1">
              <u-text size="24rpx" :text="'取消'" @click="showGroup = false" />
            </u-col>
          </u-row>
        </view>
        <view style="max-height: 600rpx; overflow-y: auto">
          <view
            v-for="(item, index) in useGroupStore().groupInfo.groupsData"
            :key="index"
            class="friends__popup__group"
          >
            <u-text
              @click="setGroup(item.id, item.name)"
              color="#353535"
              size="30rpx"
              :text="item.name"
            ></u-text>
          </view>
          <view class="friends__popup__group">
            <u-text
              @click="showNoGroup = true"
              color="#353535"
              size="30rpx"
              text="暂不分组"
            ></u-text>
          </view>
        </view>
      </view>
    </u-popup>
    <u-modal
      @cancel="showAdd = false"
      @confirm="confirmAdd()"
      :showCancelButton="true"
      :show="showAdd"
      width="600rpx"
    >
      确认添加好友并移动到{{ groupName }}分组?
    </u-modal>
    <u-modal
      @cancel="showNoGroup = false"
      @confirm="confirmNoGroup()"
      :showCancelButton="true"
      :show="showNoGroup"
      width="600rpx"
    >
      是否添加好友且暂不添加分组?
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFriendStore, useGroupStore } from '@/stores/friend'
import type { Friend } from '@/types/friend'
const friendStore = useFriendStore()
const { addFriend, searchFriend } = friendStore
const inputBox = ref()
const user = ref<Friend>({
  id: 0,
  name: '',
  notes: '',
  avatar: '',
  qrCode: '',
  userId: 0
})
async function submitSearch() {
  const data = await searchFriend(inputBox.value)
  if (data) user.value = data
}
const showGroup = ref(false)
const showAdd = ref(false)
let groupId = 0
const groupName = ref('')
const setGroup = (id: number, name: string) => {
  showAdd.value = true
  groupId = id
  groupName.value = name
}
async function confirmAdd() {
  showGroup.value = false
  showAdd.value = false
  await addFriend(user.value.userId, groupId)
  uni.showToast({
    title: '添加成功',
    icon: 'none'
  })
}
async function confirmNoGroup() {
  showGroup.value = false
  showNoGroup.value = false
  await addFriend(user.value.userId, 0)
  uni.showToast({
    title: '添加成功',
    icon: 'none'
  })
}
const showNoGroup = ref(false)
const isFriend = computed(() => {
  for (let i = 0; i < friendStore.friends.length; i++) {
    for (let j = 0; j < friendStore.friends[i].friendVO.length; j++) {
      if (friendStore.friends[i].friendVO[j].id === user.value.id) return true
    }
  }
  return false
})
const toDetail = () => {
  friendStore.friend = user.value
  uni.navigateTo({
    url: `/pages/user/friends/detail/detail?isFriend=${isFriend.value}`
  })
}
</script>

<style lang="scss" scoped>
.friends {
  padding-left: 40rpx;

  &__search-input {
    display: flex;
    width: 686rpx;
    padding: 0 10rpx 0 0;
    margin: 6rpx 0 30rpx 0;

    &__content {
      position: relative;
      display: flex;
      align-items: center;
      width: 686rpx;
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

  &__new {
    margin-top: 20rpx;
    display: flex;
    align-items: center;

    &__information {
      margin-left: 20rpx;
      width: 425rpx;
    }

    &__confirm {
      background-color: #c4dcff;
      width: 148rpx;
      height: 68rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
    }
  }

  &__popup {
    padding: 30rpx;
    max-height: 600rpx;
    overflow-y: auto;
    &__group {
      margin-top: 15rpx;
      padding-left: 10rpx;
      padding-bottom: 10rpx;
      border-bottom: solid 1px #e8e8e8;
    }
  }
}

:deep(.u-search__content) {
  border-radius: 10px !important;
}
</style>
