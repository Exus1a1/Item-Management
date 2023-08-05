<template>
  <view class="groups">
    <u-navbar bgColor="#f6f6f6" title="编辑分组" :autoBack="true" />
    <view v-show="!showNew">
      <Tag
        @deleteTag="deleteTag(item.id)"
        v-for="(item, index) in groupStore.groupInfo.groupsData"
        :key="index"
        :tag="item"
        @focus="focus"
        @blur="blur"
        :showColor="false"
        :index="index"
      >
      </Tag>
    </view>
    <view v-show="!showNew" @click="showNew = true" class="groups-plus">
      <u-icon size="70rpx" color="#fff" name="plus" />
    </view>
    <view v-if="showNew" class="groups__new">
      <view class="groups__new-title"> 名称 </view>
      <view class="groups__new-input">
        <u-input v-model="name" fontSize="35rpx" border="none" placeholder="输入物品名称" />
      </view>
      <view class="groups__new-title"> 分组成员 </view>
      <view v-for="(item, index) in friends" :key="index" class="groups__new__friend">
        <u-avatar size="75rpx" :src="item.avatar"></u-avatar>
        <view class="groups__new__friend__information">
          <u-text color="#353535" :text="item.name"></u-text>
          <u-line color="rgba(255,255,255,0)" margin="5rpx 0"></u-line>
          <u-text color="#a4a4a4" size="20rpx" :text="`id: ${item.id}`"></u-text>
        </view>
        <view @click="deleteFriend(index)" class="groups__new__friend__delete">
          <u-icon size="20rpx" color="#fff" name="close"></u-icon>
        </view>
      </view>
      <view class="groups__new-input">
        <u-text
          iconStyle="color:#3988ff"
          color="#3988ff"
          prefixIcon="plus"
          text="&nbsp;&nbsp;添加好友"
          @click="toAddFriend"
        ></u-text>
      </view>
      <view class="groups__new-submit">
        <u-button @click="showNew = false" text="返回"></u-button>
        <u-line color="rgba(255,255,255,0)" direction="col" margin="0 10rpx" />
        <u-button @click="submit" type="primary" text="确认"></u-button>
      </view>
    </view>
    <u-modal
      @cancel="showDelete = false"
      @confirm="confirmDelete()"
      :showCancelButton="true"
      :show="showDelete"
      width="600rpx"
    >
      确认删除?
    </u-modal>
    <u-modal
      @cancel="cancelChangeName"
      @confirm="confirmChangeName"
      :showCancelButton="true"
      :show="showChangeName"
      width="600rpx"
    >
      确认修改分组名?
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGroupStore } from '@/stores/friend'
const groupStore = useGroupStore()
const { fetchAllGroups, addGroup, deleteGroup, changeGroup } = groupStore
if (groupStore.groupInfo.groupsData.length === 0) fetchAllGroups()
const showNew = ref(false)
const showDelete = ref(false)
const showChangeName = ref(false)
let tempName = ''
let tempId = 0
let tempIndex = 0
let changeName = ''
const focus = (id: number, name: string, index: number): void => {
  tempName = name
  tempId = id
  tempIndex = index
}
const blur = (name: string) => {
  if (tempName !== name) showChangeName.value = true
  changeName = name
}
const deleteTag = (id: number) => {
  tempId = id
  showDelete.value = true
}
async function confirmDelete() {
  await deleteGroup(tempId)
  uni.showToast({
    title: '删除成功',
    icon: 'none',
    duration: 2000
  })
  refresh()
  showDelete.value = false
}
async function confirmChangeName() {
  showChangeName.value = false
  await changeGroup(tempId, changeName)
  uni.showToast({
    title: '修改成功',
    icon: 'none',
    duration: 2000
  })
  refresh()
}
async function submit() {
  await addGroup(name.value)
  showNew.value = false
  uni.showToast({
    title: '添加成功',
    icon: 'none',
    duration: 2000
  })
  refresh()
}
const name = ref('')
const cancelChangeName = () => {
  showChangeName.value = false
  groupStore.groupInfo.groupsData[tempIndex].name = ''
  setTimeout(() => {
    groupStore.groupInfo.groupsData[tempIndex].name = tempName
  }, 0)
}
const refresh = () => {
  groupStore.groupInfo.groupsData.length = 0
  fetchAllGroups()
}
const friends = [
  {
    id: 1,
    name: '张三',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  {
    id: 2,
    name: '李四',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  {
    id: 4,
    name: '赵六',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  {
    id: 5,
    name: '孙七',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  {
    id: 6,
    name: '周八',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  {
    id: 7,
    name: '吴九',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  {
    id: 8,
    name: '郑十',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
  }
]
const deleteFriend = (index: number) => {
  friends.splice(index, 1)
}
const toAddFriend = () => {
  uni.navigateTo({
    url: '/pages/user/friends/groups/friends/friends'
  })
}
</script>

<style lang="scss">
.groups {
  box-sizing: border-box;
  margin-top: 150rpx;
  height: calc(100vh - 150rpx);
  overflow: auto;
  background-color: #f6f6f6;

  &-plus {
    position: fixed;
    width: 100rpx;
    height: 100rpx;
    background-color: #3988ff;
    border-radius: 50rpx;
    right: 35rpx;
    bottom: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__new {
    &-title {
      margin-top: 20px;
      padding-left: 40rpx;
      color: #656565;
      font-size: 30rpx;
      margin-bottom: 20rpx;
    }

    &-input {
      padding-left: 50rpx;
      margin-top: 20rpx;
      background-color: #fff;
      height: 100rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
    }

    &-submit {
      position: fixed;
      display: flex;
      bottom: 50rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 400rpx;
    }

    &__friend {
      margin-top: 20rpx;
      padding-left: 30rpx;
      display: flex;
      align-items: center;
      &__information {
        margin-left: 20rpx;
        width: 550rpx;
      }

      &__delete {
        width: 30rpx;
        height: 30rpx;
        border-radius: 15rpx;
        background-color: #d9d9d9;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 6rpx;
      }
    }
  }
}
</style>
