<template>
  <view class="formShowItem">
    <u-row>
      <u-col :span="isDetail ? 11.5 : 10.5">
        <u-text color="#353535" :bold="true" :text="name" />
      </u-col>
      <u-col :span="isDetail ? 0.5 : 1">
        <u-icon
          @click="tempShow = !tempShow"
          color="#3988ff"
          :name="tempShow ? 'arrow-down-fill' : 'play-left-fill'"
        />
      </u-col>
      <u-col span="0.5">
        <u-icon v-if="!isDetail" @click="toPlus" name="plus" color="#2979ff" size="15" />
      </u-col>
    </u-row>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
const props = defineProps<{
  //是否显示
  show: boolean
  //是否为详情页
  isDetail: boolean
  //名字
  name: string
  //链接
  url?: string
}>()
const tempShow = ref(props.show)
const emits = defineEmits<{
  //更新是否显示布尔值
  (e: 'update:show', show: boolean): void
  (e: 'click'): void
}>()
watch(
  () => tempShow.value,
  () => {
    emits('update:show', tempShow.value)
  }
)
//跳转页面
const toPlus = (): void => {
  if (props.url)
    uni.navigateTo({
      url: `/pages/${props.url}`
    })
  else {
    emits('click')
  }
}
</script>

<style scoped lang="scss">
.formShowItem {
  margin-bottom: 10px;
}
</style>
