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
      <u-icon @click="toNewFriend" size="48rpx" name="man-add-fill"></u-icon>
    </view>
    <view class="friends__operate">
      <u-text
        @click="toGroups"
        color="#bcbcbd"
        prefixIcon="edit-pen-fill"
        lines="1"
        size="26rpx"
        text="&nbsp;编辑分组"
        iconStyle="font-size:30rpx"
      />
      <u-line margin="15rpx 20rpx" color="#f3f5fe" length="34rpx" direction="col"></u-line>
      <u-text
        prefixIcon="list"
        color="#bcbcbd"
        lines="1"
        size="26rpx"
        text="&nbsp;选择"
        iconStyle="font-size:30rpx"
      />
    </view>
    <view v-for="(group, index1) in friendStore.friends" :key="index1" class="friends__group">
      <u-text
        @click="showFriendsBox[index1] = !showFriendsBox[index1]"
        :suffixIcon="showFriendsBox[index1] ? 'arrow-down' : 'arrow-right'"
        :text="`${group.name}&nbsp;&nbsp;`"
        size="35rpx"
        bold
      ></u-text>
      <view v-show="showFriendsBox[index1]">
        <view
          @click="
            checkboxOperate
              ? (item.checked = !item.checked)
              : toDetail(item, friendStore.friends[index1])
          "
          v-for="(item, index2) in group.friendVO"
          :key="index2"
          class="friends__group__item"
          @longpress="checkboxOperate = true"
        >
          <u-avatar size="75rpx" :src="item.avatar"></u-avatar>
          <view class="friends__group__item__information">
            <u-text color="#353535" :text="item.notes ? item.notes : item.name"></u-text>
            <u-line color="rgba(255,255,255,0)" margin="5rpx 0"></u-line>
            <u-text color="#a4a4a4" size="20rpx" :text="`id: ${item.id}`"></u-text>
          </view>
          <view
            :style="`background-color:${item.checked ? `#3988ff` : `#fff`}`"
            class="friends__group__item__tick"
            v-show="checkboxOperate"
          >
            <u-icon v-if="item.checked" color="#fff" name="checkbox-mark"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <u-modal
      title="确认删除？"
      @cancel="showDelete = false"
      @confirm="confirmDelete"
      :showCancelButton="true"
      :show="showDelete"
      width="500rpx"
    >
    </u-modal>
    <view v-if="checkboxOperate" class="friends__checkbox">
      <view>
        <u-icon @click="showDelete = true" size="50rpx" name="trash" color="#898a8d"></u-icon>
        <u-text size="25rpx" color="#88898c" align="center" text="删除" :bold="true" />
      </view>
      <view>
        <u-icon @click="toMove" size="50rpx" name="rewind-right-fill" color="#898a8d"></u-icon>
        <u-text size="25rpx" color="#88898c" align="center" text="移动" :bold="true" />
      </view>
      <view>
        <u-icon @click="cancel" size="50rpx" name="close" color="#898a8d"></u-icon>
        <u-text size="25rpx" color="#88898c" align="center" text="取消" :bold="true" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFriendStore, useGroupStore } from '@/stores/friend'
import { onShow } from '@dcloudio/uni-app'
import type { Friend, Friends } from '@/types/friend'
const friendStore = useFriendStore()
const { fetchAllFriends } = friendStore
const groupStore = useGroupStore()
const { fetchAllGroups } = groupStore
if (!groupStore.groupInfo.groupsData[0]) fetchAllGroups()
const inputBox = ref('')
const submitSearch = () => {
  console.log(inputBox.value)
}
onShow(() => {
  refresh()
})
const checkboxOperate = ref(false)
const showDelete = ref(false)
const toMove = () => {
  let noEmpty = false
  friendStore.moveIds = []
  for (let i = 0; i < friendStore.friends.length; i++) {
    for (let j = 0; j < friendStore.friends[i].friendVO?.length; j++) {
      if (friendStore.friends[i].friendVO[j].checked) {
        noEmpty = true
        friendStore.moveIds.push(friendStore.friends[i].friendVO[j].userId)
      }
    }
  }
  if (noEmpty)
    uni.navigateTo({
      url: '/pages/user/friends/move/move'
    })
  else
    uni.showToast({
      title: '请先选择好友',
      icon: 'none'
    })
}
const cancel = () => {
  checkboxOperate.value = false
  for (let i = 0; i < friendStore.friends.length; i++) {
    for (let j = 0; j < friendStore.friends[i].friendVO?.length; j++) {
      friendStore.friends[i].friendVO[j].checked = false
    }
  }
}
const confirmDelete = () => {
  console.log('confirmDelete')
  showDelete.value = false
}
const showFriendsBox = ref<boolean[]>([])
const toNewFriend = () => {
  uni.navigateTo({
    url: '/pages/user/friends/new/new'
  })
}
const toGroups = () => {
  uni.navigateTo({
    url: '/pages/user/friends/groups/groups'
  })
}
const toDetail = (item: Friend, groupInfo: Friends) => {
  friendStore.group.id = groupInfo.id
  friendStore.group.name = groupInfo.name
  friendStore.friend = item
  uni.navigateTo({
    url: '/pages/user/friends/detail/detail'
  })
}
async function refresh() {
  if (!friendStore.friends[0]) await fetchAllFriends()
  for (let i = 0; i < friendStore.friends.length; i++) {
    showFriendsBox.value[i] = false
    for (let j = 0; j < friendStore.friends[i].friendVO?.length; j++) {
      friendStore.friends[i].friendVO[j].checked = false
    }
  }
}
</script>

<style lang="scss" scoped>
.friends {
  padding-bottom: 200rpx;
  &__search-input {
    display: flex;
    width: 666rpx;
    padding: 0 10rpx 0 0;
    margin: 6rpx 0 30rpx 40rpx;

    &__content {
      position: relative;
      display: flex;
      align-items: center;
      width: 612rpx;
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
  &__operate {
    display: flex;
    width: 400rpx;
    justify-content: start;
    margin-left: 40rpx;
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
  &__checkbox {
    position: fixed;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    padding-bottom: 75rpx;
    padding-top: 20rpx;
    bottom: 0;
    border-top: solid 1px #e6e6e6;
    background-color: #fcfcfe;
  }
}

:deep(.u-search__content) {
  border-radius: 10px !important;
}
</style>
