<template>
  <LoadingIcon v-if="isLoading" />
  <template v-else>
    <div class="mt-5">
      <ErrorMessage v-if="errorMessage || analyzeReceiptError">
        {{ errorMessage || analyzeReceiptError }}
      </ErrorMessage>
      <div>
        <p class="text-2xl font-bold">
          Receipt Title<span class="text-red-500">*</span>
        </p>
        <input
          v-model="receiptTitle"
          class="rounded border border-black p-2"
          @input="handleReceiptTitleChange()"
        />
      </div>
      <div class="mt-5">
        <fieldset>
          <legend class="text-2xl font-bold">
            Who paid?<span class="text-red-500">*</span>
          </legend>
          <div class="flex">
            <!-- TODO: Make this DRY if possible with a v-for -->
            <div class="center flex items-center">
              <input
                id="perry"
                class="h-5 w-5 cursor-pointer accent-teal-500"
                type="radio"
                name="who-paid"
                value="perry"
                :checked="userWhoPaid === 'perry'"
                @change="handlePayerChange"
              />
              <label class="cursor-pointer pl-2 text-xl" for="perry"
                >Perry</label
              >
            </div>
            <div class="center ml-5 flex items-center">
              <input
                id="hannah"
                class="h-5 w-5 cursor-pointer accent-teal-500"
                type="radio"
                name="who-paid"
                value="hannah"
                :checked="userWhoPaid === 'hannah'"
                @change="handlePayerChange"
              />
              <label class="cursor-pointer pl-2 text-xl" for="hannah"
                >Hannah</label
              >
            </div>
          </div>
        </fieldset>
      </div>
      <div class="mt-5">
        <h2 class="text-2xl font-bold">
          Receipt Photo<span class="text-red-500">*</span>
        </h2>
        <input
          ref="fileSelectRef"
          class="mt-3"
          type="file"
          accept=".jpg,.jpeg"
          @change="previewImage"
        />
        <div class="mt-3">
          <img v-if="imageSrc" :src="imageSrc" alt="Selected Receipt" />
          <p
            v-else
            class="flex h-80 max-h-80 w-full items-center justify-center border border-black bg-white text-2xl"
            @click="openFileSelection"
          >
            no image...
          </p>
        </div>
        <BaseButton
          ref="analyzeButtonRef"
          class="mt-4"
          @click="analyzeReceipt()"
        >
          分析
        </BaseButton>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import type { MoveToStepTwoPayload } from '@/interfaces/receipt'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'
import LoadingIcon from '@/components/atoms/LoadingIcon.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

defineProps<{
  userWhoPaid: string
}>()

const emit = defineEmits<{
  moveToStepTwo: [MoveToStepTwoPayload]
  'update:userWhoPaid': [string]
}>()
// composables
const {
  getReceiptDataFromReceipt,
  error: analyzeReceiptError,
  isLoading
} = useAnalyzeReceipt()
// states
const receiptTitle = ref('')
const imageSrc = ref('')
const selectedFile = ref<File | null>(null)
const fileSelectRef = ref()
const analyzeButtonRef = ref()
const errorMessage = ref('')
// functions
const analyzeReceipt = async () => {
  if (!selectedFile.value) {
    errorMessage.value = 'Please select a receipt you would like to analyze.'
    scrollToTop()
    return
  }
  if (receiptTitle.value === '') {
    errorMessage.value = 'Please add a title for the receipt'
    scrollToTop()
    return
  }
  const { data: receiptData } = await getReceiptDataFromReceipt(
    selectedFile.value
  )
  if (!analyzeReceiptError.value) {
    console.log('perry: receiptData: ', receiptData)
    if (receiptData) {
      emit('moveToStepTwo', {
        receiptInfo: {
          items: receiptData.receipt_info.items,
          receipt_total: receiptData.receipt_info.receipt_total
        },
        receiptTitle: receiptTitle.value,
        selectedFile: selectedFile.value
      })
    }
  } else {
    errorMessage.value =
      'Failed analyzing image. Please try again at a later time.'
  }
}
const handlePayerChange = (event: Event) => {
  clearErrorMessage()
  const target = event.target as HTMLInputElement
  emit('update:userWhoPaid', target.value)
}
const handleReceiptTitleChange = () => {
  clearErrorMessage()
}
const previewImage = (event: Event) => {
  clearErrorMessage()
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) {
    return
  }
  imageSrc.value = URL.createObjectURL(file)
  selectedFile.value = file
}
const openFileSelection = () => {
  console.log('perry: openFileSelection')
  fileSelectRef.value?.click()
}
const clearErrorMessage = () => {
  errorMessage.value = ''
}
</script>
