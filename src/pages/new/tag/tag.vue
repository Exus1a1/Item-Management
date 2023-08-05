<template>
  <view class="tags">
    <u-navbar bgColor="#f6f6f6" title="管理标签" :autoBack="true" />
    <view v-show="!showNew">
      <Tag
        @deleteTag="deleteTag(item.id)"
        @changeColor="changeColor(item.id, item.color)"
        v-for="(item, index) in useTagStore().tagInfo.tagData"
        :key="index"
        :tag="item"
        @focus="focus"
        @blur="blur"
        :showColor="true"
      >
      </Tag>
    </view>
    <view v-show="!showNew" @click="showNew = true" class="tags-plus">
      <u-icon size="70rpx" color="#fff" name="plus" />
    </view>
    <view v-if="showNew" class="tags__new">
      <view class="tags__new-label"> 名称 </view>
      <view class="tags__new-input">
        <u-input v-model="name" fontSize="35rpx" border="none" placeholder="请输入标签名称" />
      </view>
      <view class="tags__new-label"> 颜色 </view>
      <view class="tags__new-colors">
        <view @click="color = '#000000'" class="tags__new-colors-unit">
          <view class="tags__new-colors-unit-ball" />
          黑色
          <view v-show="color === '#000000'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = '#ff9813'" class="tags__new-colors-unit">
          <view style="background-color: #ff9813" class="tags__new-colors-unit-ball" />
          橙色
          <view v-show="color === '#ff9813'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = '#3988ff'" class="tags__new-colors-unit">
          <view style="background-color: #3988ff" class="tags__new-colors-unit-ball" />
          蓝色
          <view v-show="color === '#3988ff'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = '#ff6464'" class="tags__new-colors-unit">
          <view style="background-color: #ff6464" class="tags__new-colors-unit-ball" />
          红色
          <view v-show="color === '#ff6464'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = '#8439ff'" class="tags__new-colors-unit">
          <view style="background-color: #8439ff" class="tags__new-colors-unit-ball" />
          紫色
          <view v-show="color === '#8439ff'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = '#ffe600'" class="tags__new-colors-unit">
          <view style="background-color: #ffe600" class="tags__new-colors-unit-ball" />
          黄色
          <view v-show="color === '#ffe600'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
        <view @click="color = '#b3f09d'" class="tags__new-colors-unit">
          <view style="background-color: #b3f09d" class="tags__new-colors-unit-ball" />
          绿色
          <view v-show="color === '#b3f09d'" class="tags__new-colors-unit-tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
      </view>
      <view class="tags__new-submit">
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
      确认修改标签名?
    </u-modal>
    <u-modal
      @cancel="showChangeColor = false"
      @confirm="confirmChangeColor"
      :showCancelButton="true"
      :show="showChangeColor"
      width="600rpx"
    >
      确认修改颜色?
    </u-modal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTagStore } from '@/stores/tag'
const useTag = useTagStore()
const { fetchAllTags, fetchAddTag, fetchDeleteTag, fetchChangeTag } = useTag
import { useFormStore } from '@/stores/form'
const useForm = useFormStore()
const showDelete = ref(false)
let currentId = 0
const deleteTag = (id: number) => {
  currentId = id
  showDelete.value = true
}
const showChangeColor = ref(false)
const changeColor = (id: number, color: string) => {
  currentId = id
  currentColor = color
  showChangeColor.value = true
}

const confirmChangeColor = async () => {
  await fetchChangeTag(currentId, currentName, currentColor)
  fetchAllTags()
  showChangeColor.value = false
}

const confirmDelete = async () => {
  await fetchDeleteTag(currentId)
  fetchAllTags()
  for (let i = 0; i < useForm.itemData.labels.length; i++) {
    if (useForm.itemData.labels[i].id === currentId) {
      useForm.itemData.labels.splice(i, 1)
      break
    }
  }
  showDelete.value = false
}
const name = ref('')
const showNew = ref(false)
const submit = async () => {
  await fetchAddTag(name.value, color.value)
  uni.showToast({
    title: '添加成功',
    icon: 'none'
  })
  fetchAllTags()
  showNew.value = false
}
const color = ref('#000')
let currentName = ''
let currentColor = ''
let currentIndex = 0
const focus = (id: number, name: string, index: number): void => {
  currentName = name
  currentId = id
  currentIndex = index
}
const showChangeName = ref(false)
const blur = (name: string): void => {
  if (currentName !== name) {
    currentName = name
    showChangeName.value = true
  }
}
const confirmChangeName = async () => {
  await fetchChangeTag(currentId, currentName, currentColor)
  fetchAllTags()
  for (let i = 0; i < useForm.itemData.labels.length; i++) {
    if (useForm.itemData.labels[i].id === currentId) {
      useForm.itemData.labels[i].name = currentName
      break
    }
  }
  showChangeName.value = false
}
const cancelChangeName = () => {
  showChangeName.value = false
  useTagStore().tagInfo.tagData[currentIndex].name = currentName
}
</script>

<style lang="scss">
.tags {
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
    &-label {
      margin-top: 20px;
      padding-left: 40rpx;
      color: #656565;
      font-size: 30rpx;
      margin-bottom: 20rpx;
    }

    &-input {
      padding-left: 50rpx;
      background-color: #fff;
      border-radius: 20rpx;
      height: 100rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
    }

    &-colors {
      padding: 50rpx 0 50rpx 40rpx;
      background-color: #fff;
      border-radius: 20rpx;

      &-unit {
        height: 80rpx;
        display: flex;
        line-height: 80rpx;
        align-items: center;
        font-size: 35rpx;

        &-ball {
          background-color: #353535;
          width: 40rpx;
          height: 40rpx;
          border-radius: 20rpx;
          margin-right: 30rpx;
        }

        &-tick {
          background-color: #b3f09d;
          width: 35rpx;
          height: 35rpx;
          border-radius: 17.5rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          left: 500rpx;
          top: 5rpx;
        }
      }
    }

    &-submit {
      position: fixed;
      display: flex;
      bottom: 50rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 400rpx;
    }
  }
}
</style>
