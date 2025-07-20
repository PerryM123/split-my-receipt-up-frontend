<!-- 
    TODO:
    - High priority:
      - [ ] Fix broken model's design
      - [ ] Use nuxt server api to access backend API
      - [ ] Add validation for STEP_2:
        - [ ] Edit Item and Edit Price Modal cannot be a decimal or negative
    
    - Low priority:
      - [ ] Need a common header...
    -->
<template>
  <div>
    <PageTitle class="mb-6 text-center text-3xl font-bold leading-tight">
      レシート保存
    </PageTitle>
    <SavePreparation
      v-if="currentStep === STEP_1"
      v-model:user-who-paid="userWhoPaid"
      @move-to-step-two="moveToStepTwo"
    />
    <!-- TODO: Is v-model really the way to go when wanting to update the props from the child? Is this an anti-pattern to vue's one-way data flow? Need to confirm use cases -->
    <ReceiptOrganizer
      v-else-if="currentStep === STEP_2"
      v-model:receipt-info="receiptInfo"
      v-model:receipt-total="receiptTotal"
      :selected-file
      :receipt-title
      :user-who-paid
      @move-to-step-three="moveToStepThree"
    />
    <ReceiptSavedSuccessfully
      v-else-if="currentStep === STEP_3"
      :receipt-title="receiptTitle"
      :receipt-id="receiptId"
    />
  </div>
</template>
<script setup lang="ts">
import { USERS } from '@/constants'
import SavePreparation from '@/components/organisms/SavePreparation.vue'
import PageTitle from '@/components/atoms/PageTitle.vue'
import type {
  ItemInfo,
  MoveToStepThreePayload,
  MoveToStepTwoPayload,
  ReceiptInfo
} from '@/interfaces/receipt'
import ReceiptOrganizer from '@/components/organisms/ReceiptOrganizer.vue'
import ReceiptSavedSuccessfully from '@/components/organisms/ReceiptSavedSuccessfully.vue'

definePageMeta({
  layout: 'something'
})

const DEFAULT_WHO_PAID = USERS.PERRY.NAME
const userWhoPaid = ref<string>(DEFAULT_WHO_PAID)
const STEP_1 = 'step1'
const STEP_2 = 'step2'
const STEP_3 = 'step3'
type Steps = typeof STEP_1 | typeof STEP_2 | typeof STEP_3
// states
// TODO: Maybe it's time to consider pinia in this case??? Since receiptInfo, receiptTotal, selectedFile, userWhoPaid, isLoading,  etc are not being used in this file
const receiptInfo = ref<ReceiptInfo>({
  items: [],
  receipt_total: 0
})
const receiptTotal = ref(0)
const receiptId = ref<number>()
const selectedFile = ref<File | null>(null)
const receiptTitle = ref('')
const currentStep = ref<Steps>(STEP_1)
// functions
const moveToStepTwo = (payload: MoveToStepTwoPayload) => {
  currentStep.value = STEP_2
  if (payload.receiptInfo) {
    receiptTotal.value = payload.receiptInfo?.receipt_total
    receiptInfo.value.items = payload.receiptInfo.items.map(
      (receipt: ItemInfo) => {
        return {
          ...receipt,
          who_paid: USERS.BOTH.NAME
        }
      }
    )

    selectedFile.value = payload.selectedFile
    receiptTitle.value = payload.receiptTitle
  }
}
const moveToStepThree = (payload: MoveToStepThreePayload) => {
  currentStep.value = STEP_3
  receiptId.value = payload.receiptId
  receiptTitle.value = payload.receiptTitle
  window.onbeforeunload = null
}
// lifecycle
onMounted(() => {
  // ページを更新すると確認用のalertが表示されるため
  window.onbeforeunload = function () {
    return ''
  }
  const router = useRouter()
  router.beforeEach((to, from, next) => {
    if (
      from.path === '/save-receipt' &&
      to.path !== '/save-receipt' &&
      currentStep.value !== STEP_3
    ) {
      const confirmed = window.confirm(
        'Are you sure you want to leave this page? Your changes may not be saved.'
      )
      if (!confirmed) {
        next(false)
        return
      }
    }
    next()
  })
})

onUnmounted(() => {
  window.onbeforeunload = null
})
// Other
useHead({
  title: 'Save Receipt'
})
</script>
