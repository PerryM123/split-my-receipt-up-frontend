<template>
  <div class="mt-5">
    <ErrorMessage v-if="errorMessage">
      {{ errorMessage }}
    </ErrorMessage>
    <div>
      <p class="text-2xl font-bold">
        Receipt Title<span class="text-red-500">*</span>
      </p>
      <input
        v-model="receiptTitle"
        aria-label="Receipt Title"
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
    </div>
    <div class="mt-5">
      <p class="text-2xl font-bold">
        JSON Area<span class="text-red-500">*</span>
      </p>
      <textarea
        v-model="jsonInput"
        aria-label="JSON Area"
        class="h-48 w-full rounded border border-black p-2 font-mono text-sm"
        placeholder="Paste the analyzed receipt JSON here"
        @input="handleJsonInputChange()"
      />
    </div>
    <BaseButton
      ref="analyzeButtonRef"
      class="mt-4"
      @click="analyzeReceipt()"
    >
      分析
    </BaseButton>
  </div>
</template>
<script setup lang="ts">
import type { MoveToStepTwoPayload } from '@/types/receipt'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import parseReceiptAnalysisJson from '@/utils/parseReceiptAnalysisJson'

defineProps<{
  userWhoPaid: string
}>()

const emit = defineEmits<{
  moveToStepTwo: [MoveToStepTwoPayload]
  'update:userWhoPaid': [string]
}>()
// states
const receiptTitle = ref('')
const imageSrc = ref('')
const selectedFile = ref<File | null>(null)
const jsonInput = ref('')
const fileSelectRef = ref()
const analyzeButtonRef = ref()
const errorMessage = ref('')
// functions
const analyzeReceipt = () => {
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
  if (jsonInput.value.trim() === '') {
    errorMessage.value = 'Please paste the analyzed receipt JSON.'
    scrollToTop()
    return
  }
  const result = parseReceiptAnalysisJson(jsonInput.value)
  if (!result.success) {
    errorMessage.value = result.error
    scrollToTop()
    return
  }
  emit('moveToStepTwo', {
    receiptInfo: {
      items: result.data.receipt_info.items,
      receipt_total: result.data.receipt_info.receipt_total
    },
    receiptTitle: receiptTitle.value,
    selectedFile: selectedFile.value
  })
}
const handlePayerChange = (event: Event) => {
  clearErrorMessage()
  const target = event.target as HTMLInputElement
  emit('update:userWhoPaid', target.value)
}
const handleReceiptTitleChange = () => {
  clearErrorMessage()
}
const handleJsonInputChange = () => {
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
  fileSelectRef.value?.click()
}
const clearErrorMessage = () => {
  errorMessage.value = ''
}
</script>
