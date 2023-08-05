<template>
  <view class="message">
    <u-navbar
      leftIcon=""
      title="消息"
      placeholder
      bgColor="#8CBAFF"
      titleStyle="font-weight: bold"
    ></u-navbar>

    <MessageList />
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.message {
  overflow-x: hidden;
}
</style>
