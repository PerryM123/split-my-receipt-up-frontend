<!-- 
    TODO:
    - High priority:
      - [ ] Make component for STEP 3 and STEP 4
      - [ ] Add an edit button incase the Total amount is misread from OpenAI API 
      - [ ] Add validation for input text box and image
      - [ ] Add error pattern for API
      - [ ] Consider having a text box for receipt total amount or an edit button for total amount
      - [ ] Fix bug where there are odd numbers involved (refer to /docs/odd-numbers-bug.png)
      - [ ] Need to verify the math at some point since I think the tax is not being divided properly
      - [ ] Should we just use 
      - [ ] Use <CommonButton> instead of <button>
      - [ ] Make code more DRY
      - [ ] Change naming convention (Edit Item Modal? Add Item Modal? Delete Modal?)
      - [ ] Need validation for items total being high than receipt total
      - [ ] Fix broken models
    
    - Low priority:
      - [ ] Need a common header... Need an about page???
      - [ ] Add design
      - [ ] Need to convert to atomic design soon
      - [ ] Need to do e2e tests for:
        - Save-Receipt
          - [ ] After scanning receipt, are the totals correct?
          - [ ] Editing the item name and price. The totals are still correct?
    -->
<template>
  <div>
    <PageTitle>レシート保存</PageTitle>
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
useHead({
  title: 'Save Receipt'
})
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

const DEFAULT_WHO_PAID = USERS.PERRY.NAME
const userWhoPaid = ref<string>(DEFAULT_WHO_PAID)

// TODO: Maybe it's time to consider pinia in this case??? Since receiptInfo, receiptTotal, selectedFile, userWhoPaid, isLoading,  etc are not being used in this file
const receiptInfo = ref<ReceiptInfo>({
  items: [],
  receipt_total: 0
})
const receiptTotal = ref(0)
const receiptId = ref<number>()
const selectedFile = ref<File | null>(null)
const receiptTitle = ref('')
const STEP_1 = 'step1'
const STEP_2 = 'step2'
const STEP_3 = 'step3'
// TODO: Is there a better way to write this?
type Steps = typeof STEP_1 | typeof STEP_2 | typeof STEP_3
const currentStep = ref<Steps>(STEP_1)

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
}
</script>
