<template>
  <view class="form">
    <u-form errorType="toast" :rules="rules" :model="form" ref="formVerify">
      <!-- 表单验证 -->
      <u-form-item prop="name" />
      <u-navbar titleWidth="250rpx" :title="title" bgColor="#f6f6f6" :autoBack="true" />
      <view class="form__photo">
        <FormPhoto :size="'310rpx'" v-model:photoList="form.images" :isDetail="isDetail" />
      </view>
      <view class="form__information">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="2">
            <u-text :bold="true" text="属性" />
          </u-col>
          <u-col span="6">
            <u-radio-group
              :disabled="isDetail || form.type === 0"
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
          :isDetail="isDetail"
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
            <u-switch :disabled="isDetail" v-model="privacy" size="20" :activeValue="true" />
          </u-col>
        </u-row>
        <PasswordPopup
          :popup="popup"
          @close="popup = false"
          @confirmGesture="confirmGesture"
          @confirmNumber="confirmNumber"
        />
        <FormShow
          v-model:show="showTag"
          @click="addTag = true"
          :name="'标签'"
          :isDetail="isDetail"
        />
        <view v-show="showTag" class="form__information__tag">
          <FormTag
            v-for="(item, index) in labelBox"
            :checked="true"
            :tag="item"
            :key="index"
            :shape="'square'"
          ></FormTag>
        </view>
        <FormInput
          :type="'number'"
          :name="'金额'"
          :maxLength="10"
          :isDetail="isDetail"
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
          :isDetail="isDetail"
          :placeHolder="'请输入数量'"
          v-model:input="form.count"
        />
        <FormDate :is-detail="isDetail" v-model:date="date" />
        <FormInput
          :type="'text'"
          :name="'链接'"
          :maxLength="100"
          :isDetail="isDetail"
          :placeHolder="'输入物品/空间的购买链接'"
          v-model:input="form.url"
          :display="!isDetail"
        />
        <FormInput
          :type="'text'"
          :name="'状态'"
          :maxLength="30"
          :isDetail="isDetail"
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
        <FormShow
          v-model:show="showAssociate"
          @click="toAssociate"
          :name="'关联物品'"
          :isDetail="isDetail"
        />
        <view v-show="showAssociate" class="form__information__items">
          <view
            v-for="(item, index) in form.items"
            :key="index"
            class="form__information__items__item"
          >
            <u-avatar size="80rpx" :src="item.cover"></u-avatar>
            <u-text size="20rpx" lines="1" :bold="true" align="center" :text="item.name" />
            <view
              v-if="!isDetail"
              @click="deleteAssociate(index)"
              class="form__information__items__item-delete"
            >
              <view class="form__information__items__item-delete-minus"></view>
            </view>
          </view>
        </view>
        <FormShow
          v-if="form.type"
          v-model:show="showSpace"
          @click="openSpace"
          :name="'从属空间'"
          :isDetail="isDetail"
        />
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
          @click="addAdministrator = true"
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
        <FormPhoto :size="'140rpx'" v-model:photoList="form.figures" :isDetail="isDetail" />
        <u-textarea
          maxlength="200"
          :count="true"
          :autoHeight="true"
          border="none"
          v-model="form.comment"
          placeholder="补充描述该物品/空间"
          :disabled="isDetail"
        />
      </view>
      <view class="form__information">
        <FormShow v-model:show="showHistory" :name="'历史记录'" :isDetail="true" />
        <view v-show="showHistory" :key="index" v-for="(item, index) in useForm.logsInfo.logsData">
          <FormHistory :history="item" />
        </view>
      </view>
    </u-form>
    <view v-if="!isDetail" class="form__submit">
      <u-button
        :loading="isLoading"
        loadingText="修改中"
        @click="submitForm"
        type="primary"
        text="确认"
      />
    </view>
    <!-- <u-popup :safeAreaInsetBottom="false" round="20rpx" mode="bottom" :show="addAdministrator">
      <view class="form__popup">
        <view class="form__popup__title">
          <u-text bold size="40rpx" :text="'管理人'" />
          <u-icon color="#5196ff" name="edit-pen-fill"></u-icon>
        </view>
        <view class="form__popup__operate">
          <u-text @click="addAdministrator = false" lines="1" size="20rpx" :text="'取消'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="clear()" color="#82b4fe" lines="1" size="20rpx" :text="'清除'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="confirm()" color="#82b4fe" lines="1" size="20rpx" :text="'确认'" />
        </view>
      </view>
      <view class="form__avatars">
        <view v-for="(item, index) in form.administrator" :key="index" class="form__avatars__item">
          <u-avatar @click="tick(index)" size="80rpx" :src="item.avatar"></u-avatar>
          <u-text size="25rpx" lines="1" :bold="true" align="center" :text="item.name" />
          <view v-show="tickBox[index] === true" class="form__avatars__item__tick">
            <u-icon size="25rpx" name="checkmark" color="#fff"></u-icon>
          </view>
        </view>
      </view>
      <view class="form__authority">
        <u-radio-group v-model="authorityValue" placement="column" shape="square">
          <u-radio :customStyle="{ marginRight: '20rpx' }" label="仅查看" name="仅查看" />
          <u-radio
            :customStyle="{ marginRight: '20rpx' }"
            label="可查看并编辑"
            name="可查看并编辑"
          />
        </u-radio-group>
      </view>
    </u-popup> -->
    <u-popup :safeAreaInsetBottom="false" round="20rpx" mode="bottom" :show="addTag">
      <view class="form__popup">
        <view class="form__popup__title">
          <u-text bold size="35rpx" :text="'标签'" />
          <u-icon @click="toTag" color="#5196ff" name="edit-pen-fill"></u-icon>
        </view>
        <view class="form__popup__operate">
          <u-text @click="addTag = false" lines="1" size="20rpx" :text="'取消'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="clearTag()" color="#82b4fe" lines="1" size="20rpx" :text="'清除'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text @click="confirmTag()" color="#82b4fe" lines="1" size="20rpx" :text="'确认'" />
        </view>
        <view class="form__popup__tags">
          <FormMultiple
            :tagBox="tagBox"
            :tags="useTag.tagInfo.tagData"
            @checkboxClick="checkboxClick"
          />
        </view>
      </view>
    </u-popup>
    <u-popup :safeAreaInsetBottom="false" round="20rpx" mode="bottom" :show="changeSpace">
      <view class="form__popup">
        <view class="form__popup__title">
          <u-text bold size="35rpx" :text="'从属空间'" />
        </view>
        <view class="form__popup__operate">
          <u-text @click="cancelSpace" lines="1" size="20rpx" :text="'取消'" />
          <u-line margin="15rpx 20rpx" color="#efeff2" length="50%" direction="col"></u-line>
          <u-text
            @click="changeSpace = false"
            color="#82b4fe"
            lines="1"
            size="20rpx"
            :text="'确认'"
          />
        </view>
        <view v-if="changeSpace" class="form__popup__tags">
          <SubordinateSpaceItem
            v-for="(item, subIndex) in pathInfo"
            :ids="[form.id]"
            :titlePadding="'10rpx 10rpx'"
            :tagPadding="'0 20rpx'"
            v-show="pathFloor >= subIndex"
            @radioClick="radioClick"
            :parent="subIndex ? spacesBox[subIndex - 1].id : 0"
            :id="spacesBox[subIndex].id"
            :subordinateSpaces="item"
            :key="subIndex"
            :floor="subIndex + 1"
            :currentFloor="currentFloor"
          />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { useTagStore } from '@/stores/tag'
import { useSpaceStore } from '@/stores/space'
import { useFormStore } from '@/stores/form'
import { onShow } from '@dcloudio/uni-app'
import type { ItemForm, RoomForm, imgData } from '@/types/form.d.ts'
import type { PathData } from '@/types/space.d.ts'
// 引入组件
import FormDate from '@/components/Form/FormDate/FormDate.vue'
import FormTag from '@/components/Form/FormTag/FormTag.vue'
import FormShow from '@/components/Form/FormShow/FormShow.vue'
import FormPhoto from '@/components/Form/FormPhoto/FormPhoto.vue'
import FormInput from '@/components/Form/FormInput/FormInput.vue'
import FormMultiple from '@/components/Form/FormMultiple/FormMultiple.vue'
import FormHistory from '@/components/Form/FormHistory/FormHistory.vue'
import SubordinateSpaceItem from '@/components/Space/SubordinateSpaceItem/SubordinateSpaceItem.vue'

// 是否正在提交
const isLoading = ref(false)

const props = withDefaults(
  defineProps<{
    //是否为详情页
    isDetail?: boolean
    //是否从详情页跳转来的
    detailDeparture?: boolean
  }>(),
  {
    isDetail: false,
    detailDeparture: false
  }
)

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
const {
  addFigure,
  addImg,
  fetchItemLogs,
  currentFloor,
  currentId,
  updateRoomData,
  updateItemData
} = useForm
const useSpace = useSpaceStore()
const { pathInfo } = useSpace
if (useTag.tagInfo.tagData.length === 0) fetchAllTags()

//表单数据
const form = reactive({
  ...useForm.itemData
})

//标题
const title = form.name

//上传图片
async function uploadImg(
  images: imgData[],
  type: number
): Promise<
  {
    id: number
    url: string
  }[]
> {
  if (type)
    for (let i = 0; i < images.length; i++) {
      images[i] = await addFigure(images[i].url)
    }
  else
    for (let i = 0; i < images.length; i++) {
      images[i] = await addImg(images[i].url)
    }
  return images as {
    id: number
    url: string
  }[]
}

//物品属性
const radioValue = form.type === 2 ? ref('物品') : ref('空间')

//显示二维码
const showCode = ref(false)

//隐私权
const privacy = ref(form.privacy ? true : false)
//密码弹窗
const popup = ref(false)
//密码
const PIN = ref('')
//是否修改过隐私设置
let changed = false
//验证手势密码
const confirmGesture = (password: string) => {
  PIN.value = password
}
//验证数字密码
const confirmNumber = (password: string) => {
  PIN.value = password
}
watch(
  () => privacy.value,
  () => {
    changed = true
    if (privacy.value) popup.value = true
    else PIN.value = ''
  }
)
watch(
  () => popup.value,
  () => {
    if (!popup.value && !PIN.value) privacy.value = false
  }
)

//日期
const date = ref(new Date(form.date).getTime())
//更改日期格式
function currentTime(timestamp: number): string {
  var now = new Date(timestamp)
  var zeroFill = function (value: number) {
    if (value < 10) {
      return '0' + String(value)
    }
    return value
  }

  var year = now.getFullYear()
  //年
  var month = zeroFill(now.getMonth() + 1)
  //月
  var day = zeroFill(now.getDate())

  return `${year}-${month}-${day}`
}

//显示标签
const showTag = ref(true)
//添加标签
const addTag = ref(false)
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
//清空标签
const clearTag = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tagBox.value.forEach((item) => (item = false))
  labelBox.value = []
  addTag.value = false
}
//确认添加标签
const confirmTag = (): void => {
  addTag.value = false
  labelBox.value = []
  for (let i = 0; i < tagBox.value.length; i++) {
    if (tagBox.value[i]) labelBox.value.push(useTag.tagInfo.tagData[i])
  }
}
//标签选取事件
const checkboxClick = (index: number): void => {
  if (!props.isDetail) tagBox.value[index] = !tagBox.value[index]
}
//跳转至标签编辑页
const toTag = (): void => {
  form.labels = labelBox.value
  uni.navigateTo({
    url: `/pages/new/tag/tag`
  })
}

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
const toAssociate = () => {
  useForm.itemData.items = form.items
  uni.navigateTo({
    url: `/pages/new/dependence/dependence`
  })
}

//显示从属空间
const showSpace = ref(false)
//修改从属空间
const changeSpace = ref(false)
//从属空间缓存
let tempSpaces = <PathData[]>[]
//当前楼层缓存
let tempPathFloor = 0
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
//从属空间标签点击事件
const radioClick = (index: number, floor: number): void => {
  //点击已选择标签
  if (spacesBox.value[floor - 1].id === pathInfo[floor - 1][index].id) {
    //修改当前楼层
    pathFloor.value = floor - 1
    //清空当前点击索引之后的已选择空间id缓存
    for (let i = floor - 1; i < spacesBox.value.length; i++) {
      if (!spacesBox.value[i]) break
      spacesBox.value[i] = { fatherId: 0, id: 0, name: '', layer: 0 }
    }
  }
  //点击未选择标签
  else {
    //修改当前楼层
    pathFloor.value = floor
    //将当前id存入已选择id缓存中
    spacesBox.value[floor - 1] = pathInfo[floor - 1][index]
    //清空当前点击索引之后的已选择空间id缓存
    for (let i = floor; i < spacesBox.value.length; i++) {
      if (!spacesBox.value[i]) break
      spacesBox.value[i] = { fatherId: 0, id: 0, name: '', layer: 0 }
    }
  }
}
const openSpace = (): void => {
  changeSpace.value = true
  for (let i = 0; i < spacesBox.value.length; i++) {
    tempSpaces[i] = spacesBox.value[i]
  }
  tempPathFloor = pathFloor.value
}

const cancelSpace = (): void => {
  changeSpace.value = false
  spacesBox.value = tempSpaces
  pathFloor.value = tempPathFloor
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

//上传表单时的回调
const submitForm = (): void => {
  formVerify.value
    .validate()
    .then(async () => {
      try {
        const originalImgs = form.images.filter((item) => 'id' in item)
        const newImages = await uploadImg(
          form.images.filter((item) => !('id' in item)),
          0
        )
        const images = originalImgs.concat(newImages)
        const originalFigures = useForm.itemData.images.filter((item) => 'id' in item)
        const newFigures = await uploadImg(
          form.images.filter((item) => !('id' in item)),
          1
        )
        const figures = originalFigures.concat(newFigures)
        if (form.type) {
          const path = []
          for (let i = 0; i < pathFloor.value; i++) {
            path.push({
              id: spacesBox.value[i].id,
              name: spacesBox.value[i].name
            })
          }
          const tempForm = <ItemForm>{
            privacy: privacy.value ? 1 : 0,
            type: radioValue.value === '空间' ? 1 : 2,
            price: Number(form.price),
            count: Number(form.count),
            name: form.name,
            state: form.state,
            comment: form.comment,
            date: currentTime(date.value),
            path: path,
            labels: labelBox.value,
            fatherName: spacesBox.value[pathFloor.value - 1].name,
            url: form.url,
            images: images,
            figures: figures,
            password: PIN.value,
            items: form.items
          }
          if (!changed || !PIN.value) delete tempForm.password
          isLoading.value = true
          await updateItemData(currentId, form.id, tempForm)
          uni.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          isLoading.value = false
          setTimeout(() => {
            uni.navigateBack({
              delta: props.detailDeparture ? 2 : 1
            })
          }, 1000)
        } else {
          const tempForm = <RoomForm>{
            privacy: privacy.value ? 1 : 0,
            type: 0,
            price: Number(form.price),
            name: form.name,
            state: form.state,
            address: '',
            location: '',
            comment: form.comment,
            date: currentTime(date.value),
            images: images,
            figures: figures,
            labels: labelBox.value,
            password: PIN.value
          }
          if (!changed || !PIN.value) delete tempForm.password
          isLoading.value = true
          await updateRoomData(form.id, tempForm)
          uni.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          isLoading.value = false
          setTimeout(() => {
            uni.navigateBack({
              delta: props.detailDeparture ? 2 : 1
            })
          }, 1000)
        }
      } catch {
        isLoading.value = false
      }
    })
    .catch((error: any) => {
      console.log(error)
    })
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
