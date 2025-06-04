<!-- 
TODO: 
- Add: if I hit enter, it will focus to the next input  
-->
<template>
  <LoadingIcon v-if="isLoading" />
  <template v-else>
    <div class="mt-5">
      <ErrorMessage v-if="error">
        {{ getErrorMessage() }}
      </ErrorMessage>
      <div>
        <p class="text-2xl font-bold">Receipt Title</p>
        <input
          v-model="receiptTitle"
          class="rounded border border-black p-2"
          @input="handleReceiptTitleChange()"
        />
      </div>
      <div class="mt-5">
        <fieldset>
          <legend class="text-2xl font-bold">Who paid?</legend>
          <div class="flex">
            <!-- TODO: Make this DRY if possible with a v-for -->
            <div class="center flex items-center">
              <input
                id="perry"
                class="h-5 w-5 cursor-pointer"
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
                class="h-5 w-5 cursor-pointer"
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
        <h2 class="text-2xl font-bold">Receipt Photo</h2>
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
            class="flex h-80 max-h-80 w-full items-center justify-center border border-black text-2xl"
            @click="openFileSelection"
          >
            no image...
          </p>
        </div>
        <button
          ref="analyzeButtonRef"
          :disabled="!selectedFile"
          class="mt-5 block w-full rounded border border-solid border-black bg-gray-300 px-5 py-5 text-center transition-all duration-700 first:mt-0 hover:opacity-30"
          @click="analyzeReceipt(selectedFile)"
        >
          分析
        </button>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import type { MoveToStepTwoPayload } from '@/interfaces/receipt'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'
import LoadingIcon from '@/components/atoms/LoadingIcon.vue'

defineProps<{
  userWhoPaid: string
}>()

const emit = defineEmits<{
  moveToStepTwo: [MoveToStepTwoPayload]
}>()
const receiptTitle = ref('')
const imageSrc = ref('')
const selectedFile = ref<File | null>(null)
const fileSelectRef = ref()
const analyzeButtonRef = ref()

const {
  getReceiptDataFromReceipt,
  clearErrorMessage,
  error,
  data: receiptData,
  isLoading
} = useAnalyzeReceipt()

const analyzeReceipt = async (selectedFile: File | null) => {
  console.log('perry: analyzeReceipt: props.selectedFile: ', selectedFile)
  await getReceiptDataFromReceipt(selectedFile)
  if (!error.value) {
    console.log('perry: receiptData.value: ', receiptData.value)
    if (receiptData.value) {
      emit('moveToStepTwo', {
        receiptInfo: {
          // TODO: There might be a better way to write this
          items: receiptData.value?.receipt_info.items,
          receipt_total: receiptData.value?.receipt_info.receipt_total
        },
        receiptTitle: receiptTitle.value,
        selectedFile
      })
    }
  }
}
// TODO: This is placeholder
const getErrorMessage = () => {
  return 'Unknown error occurred'
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
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) {
    return
  }
  imageSrc.value = URL.createObjectURL(file)
  selectedFile.value = file
}
const openFileSelection = () => {
  fileSelectRef.value?.click()
}
</script>
