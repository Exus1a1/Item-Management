<template>
  <view v-if="loading" class="form">
    <u-form errorType="toast" :rules="rules" :model="form" ref="formVerify">
      <!-- 表单验证 -->
      <u-form-item prop="name" />
      <u-navbar titleWidth="250rpx" :title="title" bgColor="#f6f6f6" :autoBack="true" />
      <view class="form__photo">
        <FormPhoto :size="'310rpx'" v-model:photoList="form.images" :isDetail="true" />
      </view>
      <view class="form__information">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="2">
            <u-text :bold="true" text="属性" />
          </u-col>
          <u-col span="6">
            <u-radio-group
              :disabled="true || form.type === 0"
              v-model="radioValue"
              placement="row"
              shape="square"
            >
              <u-radio :customStyle="{ marginRight: '20rpx' }" label="空间" name="空间" />
              <u-radio :customStyle="{ marginRight: '20rpx' }" label="物品" name="物品" />
            </u-radio-group>
          </u-col>
        </u-row>
        <FormInput
          :type="'text'"
          :name="'名称'"
          :maxLength="30"
          :isDetail="true"
          :placeHolder="'最多输入三十字'"
          v-model:input="form.name"
        />
        <u-row>
          <u-col span="2">
            <u-text color="#353535" :bold="true" text="二维码" />
          </u-col>
          <u-col span="10">
            <u-icon @click="showCode = true" name="grid"></u-icon>
          </u-col>
          <u-popup
            overlayOpacity="0"
            :safeAreaInsetBottom="false"
            round="30rpx"
            mode="center"
            :show="showCode"
            @close="showCode = false"
          >
            <view class="form__information__code">
              <view class="form__information__code__text">
                <u-text size="28rpx" color="#000" align="center" text="将物品二维码发送给好友" />
                <u-button
                  disabled
                  customStyle="border:none;width:50rpx;"
                  open-type="share"
                  icon="share"
                />
              </view>
              <image class="form__information__code__img" :src="form.qrCode" />
            </view>
          </u-popup>
        </u-row>
      </view>
      <view class="form__information">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="10.5">
            <u-text color="#353535" :bold="true" text="隐私" />
          </u-col>
          <u-col span="1.5">
            <u-switch :disabled="true" v-model="privacy" size="20" :activeValue="true" />
          </u-col>
        </u-row>
        <FormShow v-model:show="showTag" :name="'标签'" :isDetail="true" />
        <view v-show="showTag" class="form__information__tag">
          <FormTag
            v-for="(item, index) in labelBox"
            :checked="true"
            :tag="item"
            :key="index"
            :shape="'square'"
          >
          </FormTag>
        </view>
        <FormInput
          :type="'number'"
          :name="'金额'"
          :maxLength="10"
          :isDetail="true"
          :placeHolder="'请输入金额'"
          :unitName="'元'"
          v-model:input="form.price"
          :span="4"
        />
        <FormInput
          v-if="form.type"
          :type="'number'"
          :name="'数量'"
          :maxLength="10"
          :isDetail="true"
          :placeHolder="'请输入数量'"
          v-model:input="form.count"
        />
        <FormDate :is-detail="true" v-model:date="date" />
        <FormInput
          :type="'text'"
          :name="'链接'"
          :maxLength="100"
          :isDetail="true"
          :placeHolder="'输入物品/空间的购买链接'"
          v-model:input="form.url"
          :display="!true"
        />
        <FormInput
          :type="'text'"
          :name="'状态'"
          :maxLength="30"
          :isDetail="true"
          :placeHolder="'输入物品状态'"
          v-model:input="form.state"
        >
          <template #icon>
            <u-icon
              @click="showToast()"
              name="question-circle"
              customStyle="position: absolute;top:-5px;left:30px"
            />
          </template>
        </FormInput>
        <u-toast ref="toast"></u-toast>
      </view>
      <view v-if="form.type" class="form__information">
        <FormShow v-model:show="showAssociate" :name="'关联物品'" :isDetail="true" />
        <view v-show="showAssociate" class="form__information__items">
          <view
            v-for="(item, index) in form.items"
            :key="index"
            class="form__information__items__item"
          >
            <u-avatar size="80rpx" :src="item.cover"></u-avatar>
            <u-text size="20rpx" lines="1" :bold="true" align="center" :text="item.name" />
            <view
              v-if="false"
              @click="deleteAssociate(index)"
              class="form__information__items__item-delete"
            >
              <view class="form__information__items__item-delete-minus"></view>
            </view>
          </view>
        </view>
        <FormShow v-if="form.type" v-model:show="showSpace" :name="'从属空间'" :isDetail="true" />
        <view class="form__information__subordinateSpace" v-if="showSpace">
          <view class="space__subordinateSpace__floor">
            <SubordinateSpaceItem
              v-for="(item, subIndex) in spacesBox"
              :ids="[form.id]"
              :titlePadding="'10rpx 10rpx'"
              :tagPadding="'0 20rpx'"
              v-show="pathFloor >= subIndex"
              :parent="subIndex ? spacesBox[subIndex - 1].id : 0"
              :id="spacesBox[subIndex].id"
              :subordinateSpaces="[item]"
              :key="subIndex"
              :floor="subIndex + 1"
              :currentFloor="currentFloor"
            />
          </view>
        </view>
        <!-- <FormShow
            ../..click="addAdministrator = true"
            v-model:show="showAdministrator"
            :name="'管理人'"
            :isDetail="isDetail"
          />
          <u-row v-if="showAdministrator" customStyle="margin-top:10px">
            <view
              v-for="(item, index) in form.administrator"
              :key="index"
              class="form__information__administrator"
            >
              <u-avatar size="80rpx" :src="item.avatar"></u-avatar>
              <u-text size="25rpx" lines="1" :bold="true" align="center" :text="item.name" />
            </view>
          </u-row> -->
      </view>
      <view class="form__information">
        <u-text color="#353535" customStyle="margin-bottom: 10px" :bold="true" text="备注" />
        <FormPhoto :size="'140rpx'" v-model:photoList="form.figures" :isDetail="true" />
        <u-textarea
          maxlength="200"
          :count="true"
          :autoHeight="true"
          border="none"
          v-model="form.comment"
          placeholder="补充描述该物品/空间"
          :disabled="true"
        />
      </view>
      <view class="form__information">
        <FormShow v-model:show="showHistory" :name="'历史记录'" :isDetail="true" />
        <view v-show="showHistory" :key="index" v-for="(item, index) in useForm.logsInfo.logsData">
          <FormHistory :history="item" />
        </view>
      </view>
    </u-form>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useTagStore } from '../../stores/tag'
import { useSpaceStore } from '../../stores/space'
import { useFormStore } from '../../stores/form'
import { onShow } from '@dcloudio/uni-app'
import type { PathData } from '../../types/space.d.ts'
// 引入组件
import FormDate from '../../components/Form/FormDate/FormDate.vue'
import FormTag from '../../components/Form/FormTag/FormTag.vue'
import FormShow from '../../components/Form/FormShow/FormShow.vue'
import FormPhoto from '../../components/Form/FormPhoto/FormPhoto.vue'
import FormInput from '../../components/Form/FormInput/FormInput.vue'
import FormHistory from '../../components/Form/FormHistory/FormHistory.vue'
import SubordinateSpaceItem from '../../components/Space/SubordinateSpaceItem/SubordinateSpaceItem.vue'

const loading = ref(false)
// 是否正在提交

onMounted(() => {
  // 开启分享功能
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
})

const useTag = useTagStore()
const { fetchAllTags } = useTag
const useForm = useFormStore()
const { fetchItemLogs, currentFloor } = useForm
const useSpace = useSpaceStore()
const { pathInfo } = useSpace
if (useTag.tagInfo.tagData.length === 0) fetchAllTags()

//表单数据
const form = reactive({
  ...useForm.itemData
})

//标题
const title = form.name

//物品属性
const radioValue = form.type === 2 ? ref('物品') : ref('空间')

//显示二维码
const showCode = ref(false)

//隐私权
const privacy = ref(form.privacy ? true : false)

//日期
const date = ref(new Date(form.date).getTime())
//显示标签
const showTag = ref(true)
//当前标签数组
const labelBox = ref()
//选取标签数组
const tagBox = ref<boolean[]>([])
onShow(() => {
  labelBox.value = useForm.itemData.labels
  tagBox.value = new Array(useTag.tagInfo.tagData.length).fill(false)
  for (let i = 0; i < useForm.itemData.labels.length; i++) {
    for (let j = 0; j < useTag.tagInfo.tagData.length; j++) {
      if (form.labels[i].id === useTag.tagInfo.tagData[j].id) {
        tagBox.value[j] = true
      }
    }
  }
  form.items = useForm.itemData.items
  associateBox.value = new Array(form.items.length).fill(true)
})

//状态消息提示
const toast = ref()
const showToast = (): void => {
  toast.value.show({
    message: "用于描述物品的使用状态,比如可以填入'五成新'、'未使用过'、'已借出'等"
  })
}

const showAssociate = ref(true)
if (!useForm.itemData.items) {
  useForm.itemData.items = []
  form.items = []
}
const associateBox = ref(new Array(form.items.length).fill(true))
const deleteAssociate = (index: number) => {
  form.items.splice(index, 1)
}

//显示从属空间
const showSpace = ref(false)
//当前路径
const spacesBox = ref<PathData[]>([])
//当前层数
const pathFloor = ref<number>(0)
//初始化当前路径
for (let i = 0; i < pathInfo.length; i++) {
  spacesBox.value[i] = { fatherId: 0, id: 0, name: '', layer: 0 }
}
for (let i = 0; i < form.path.length; i++) {
  pathFloor.value++
  spacesBox.value[form.path.length - 1 - i] = {
    fatherId: i ? form.path[i - 1].id : 0,
    id: form.path[i].id,
    name: form.path[i].name,
    layer: i
  }
}

if (!form.comment) form.comment = ''

//显示历史记录
const showHistory = ref(false)
//获取物品日志
fetchItemLogs(form.id)

//显示管理人
// const showAdministrator = ref(false)
//显示添加管理员
// const addAdministrator = ref(false)
// const clear = (): void => {
//   addAdministrator.value = false
// }
// const confirm = (): void => {
//   addAdministrator.value = false
// }
// const tick = (index: number): void => {
//   tickBox.value[index] = !tickBox.value[index]
// }

// const tickBox = ref<boolean[]>(new Array(form.administrator.length).fill(false))
// const authorityValue = ref('仅查看')

//表单规则
const formVerify = ref()
const rules = {
  name: [
    {
      required: true,
      message: '请输入名称',
      trigger: ['blur', 'change']
    }
  ]
}
</script>

<style lang="scss">
.form {
  padding: 30rpx;
  margin-top: 40px;
  background-color: #f6f6f6;

  &__photo {
    padding: 0rpx 0rpx 20rpx 30rpx;
  }

  &__popup {
    padding: 30rpx 0 0 30rpx;
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;

    &__title {
      display: flex;
      margin-right: 280rpx;
    }

    &__operate {
      width: 250rpx;
      display: flex;
    }

    &__tags {
      padding: 20rpx;
      min-height: 200rpx;
      max-height: 500rpx;
      overflow: auto;
    }
  }

  // &__authority {
  //   padding-left: 40rpx;
  //   padding-bottom: 40rpx;
  // }

  // &__avatars {
  //   display: flex;
  //   padding: 20rpx 40rpx;
  //   padding-right: 0;
  //   overflow-x: auto;
  //   flex-wrap: nowrap;

  //   &__item {
  //     padding-right: 20rpx;
  //     position: relative;

  //     &__tick {
  //       width: 28rpx;
  //       height: 28rpx;
  //       border-radius: 14rpx;
  //       background-color: #ff6464;
  //       position: absolute;
  //       right: 15rpx;
  //       bottom: 30rpx;
  //       display: flex;
  //       align-items: center;
  //       justify-content: center;
  //     }
  //   }
  // }

  &__information {
    border-radius: 30rpx;
    background-color: #fff;
    padding: 20rpx;
    margin-bottom: 30rpx;

    &__state {
      width: 500rpx;
      padding: 50rpx 50rpx 0 50rpx;
      border-radius: 30rpx;
      background-color: #fcfcfe;
      text-align: center;
    }

    &__subordinateSpace {
      max-height: 200px;
      overflow-y: auto;
    }

    &__code {
      width: 400rpx;
      padding-top: 20rpx;

      &__text {
        display: flex;
        padding: 0 30rpx 0 30rpx;
        justify-content: center;
      }

      &__img {
        width: 300rpx;
        height: 300rpx;
        margin: 0 50rpx;
      }
    }

    &__tag {
      display: flex;
      justify-content: flex-start;
      flex-flow: row wrap;
    }

    &__administrator {
      width: 80rpx;
      margin-right: 20rpx;
    }

    &__items {
      display: flex;
      justify-content: flex-start;
      flex-flow: row nowrap;
      overflow-x: auto;

      &__item {
        width: 80rpx;
        margin-right: 20rpx;
        position: relative;

        &-delete {
          width: 30rpx;
          height: 30rpx;
          position: absolute;
          border-radius: 15rpx;
          right: -6rpx;
          top: 0;
          background-color: #2979ff;
          display: flex;
          justify-content: center;
          align-items: center;

          &-minus {
            width: 22rpx;
            height: 4rpx;
            border-radius: 2rpx;
            background-color: #fff;
          }
        }
      }
    }
  }

  &__submit {
    margin: 0 auto;
    width: 200rpx;
  }
}
</style>
