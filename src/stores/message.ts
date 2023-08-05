import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { MessageList } from '@/types/message'

export const useMessageStore = defineStore('message', () => {
  const currentMessageList: any = reactive({
    currentPage: 0,
    total: 10,
    messageList: [
      // 系统通知
      {
        id: 1,
        avatar: '/static/message/systemAvatar.png',
        username: '系统通知',
        content: '系统已收到您的反馈内容',
        message: {
          userId: 111,
          chatLogList: [
            {
              id: '111',
              types: 0,
              time: '2023.8.8 12:00:00',
              content: '系统已经收到您的反馈信息，感谢您的支持。',
              isUpdate: false,
              cover: '/static/defaultRoom.png',
              status: 1
            },
            {
              id: '112',
              types: 0,
              time: '2023.8.9 18:00:00',
              content: 'i收纳已更新2.0版本',
              isUpdate: true,
              status: 1
            }
          ]
        }
      },
      // 好友申请
      {
        id: 2,
        avatar: '/static/message/friendApplication.png',
        username: '好友申请',
        content: '用户138申请添加好友',
        message: {
          userId: 111,
          chatLogList: [
            {
              id: '111',
              types: 0,
              time: '2023.8.8 12:00:00',
              title: '用户123',
              content: '请求添加您为好友',
              isFinished: false,
              isAccept: false,
              status: 1
            },
            {
              id: '112',
              types: 1,
              time: '2023.8.9 18:00:00',
              title: '用户567',
              content: '',
              isValidating: false,
              status: 1
            },
            {
              id: '113',
              types: 0,
              time: '2023.8.10 19:00:00',
              title: '用户567',
              content: '请求添加您为好友',
              isFinished: false,
              isAccept: false,
              status: 0
            }
          ]
        }
      },
      // 管理申请
      {
        id: 3,
        avatar: '/static/message/manageApplications.png',
        username: '管理申请',
        content: '您已成功成为用户138房子的共享管理人',
        message: {
          userId: 111,
          chatLogList: [
            {
              id: '111',
              types: 0,
              time: '2023.8.10 12:00:00',
              title: '用户123',
              content: '邀请您成为“房子176”的共同管理人',
              roomName: '房子176',
              cover: '/static/defaultRoom.png',
              isFinished: false,
              isAccept: false,
              status: 1
            },
            {
              id: '112',
              types: 0,
              time: '2023.8.19 12:00:00',
              title: '用户123',
              content: '邀请您成为“房子1”的共同管理人',
              roomName: '房子1',
              cover: '/static/defaultRoom.png',
              isFinished: false,
              isAccept: false,
              status: 0
            },
            {
              id: '113',
              types: 1,
              time: '2023.8.19 12:00:00',
              title: '用户123',
              content: '成为“房子1”的共同管理人',
              roomName: '房子176789',
              cover: '/static/defaultRoom.png',
              isFinished: false,
              isAccept: false,
              status: 1
            }
          ]
        }
      },
      // 物品分享
      {
        id: 4,
        avatar: '/static/message/itemSharing.png',
        username: '物品分享',
        content: '用户138向您分享了物品帽子',
        message: {
          userId: 111,
          chatLogList: [
            {
              id: '111',
              types: 0,
              time: '2023.8.8 12:00:00',
              title: '用户123',
              content: '给您分享了一个房子',
              type: 1,
              roomName: '房子176789',
              cover: '/static/defaultRoom.png',
              privacy: 0,
              status: 0
            },
            {
              id: '112',
              types: 1,
              time: '2023.8.9 18:00:00',
              title: '用户123',
              content: '给您分享了一件私密物品“房子176789”',
              type: 2,
              roomName: '房子176789',
              cover: '/static/defaultRoom.png',
              privacy: 1,
              status: 1
            }
          ]
        }
      }
    ]
  })

  function fetchNewMessageList() {
    // 请求新的消息列表，存入 store
  }

  return {
    currentMessageList,
    fetchNewMessageList
  }
})
