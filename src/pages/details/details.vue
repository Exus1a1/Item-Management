<template>
  <view>
    <Form :isDetail="true" />
    <view class="delete">
      <u-icon @click="showDelete = true" size="70rpx" name="trash" color="#565b6d"></u-icon>
    </view>
    <view class="edit">
      <u-icon @click="toEdit" size="70rpx" name="edit-pen-fill" color="#fff"></u-icon>
      编辑
    </view>
  </view>
  <u-modal
    @cancel="showDelete = false"
    @confirm="deleteItem"
    :showCancelButton="true"
    :show="showDelete"
    width="600rpx"
  >
    确认删除?
  </u-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormStore } from '@/stores/form'
const useForm = useFormStore()
const { modifyDeleteItemData, itemData } = useForm
const showDelete = ref(false)
import { onShareAppMessage } from '@dcloudio/uni-app'
onShareAppMessage(() => {
  return {
    title: '理物丨向你分享了一件物品',
    path: `/pages/share/share?id=${useForm.itemData.id}&type=${useForm.itemData.type}`,
    imageUrl: '/static/plant.png'
  }
})
async function deleteItem() {
  showDelete.value = false
  uni.showToast({
    title: '删除中...',
    icon: 'none'
  })
  await modifyDeleteItemData([itemData.id])
  uni.showToast({
    title: '删除成功',
    icon: 'success'
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
const toEdit = () => {
  uni.navigateTo({
    url: `/pages/edit/edit?detail=true`
  })
}
</script>

<style lang="scss">
.delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100rpx;
  height: 100rpx;
  background-color: #d9d9d9;
  position: fixed;
  bottom: 200rpx;
  right: 200rpx;
  border-radius: 20rpx;
  z-index: 5;
}

.edit {
  display: flex;
  color: #fff;
  line-height: 100rpx;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  width: 200rpx;
  height: 100rpx;
  background-color: #3988ff;
  position: fixed;
  bottom: 200rpx;
  right: 0rpx;
  border-radius: 20rpx;
  z-index: 5;
}
</style>
