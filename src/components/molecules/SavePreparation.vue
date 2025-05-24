<template>
  <!-- TODO: Make a component of the 1st step -->
  <div v-if="error" class="p-8">
    <p class="rounded border border-red-500 bg-red-100 p-3">
      {{ getErrorMessage() }}
    </p>
  </div>
  <p>Receipt Title</p>
  <input v-model="receiptTitle" @input="handleReceiptTitleChange()" />
  <fieldset>
    <legend>Who paid?</legend>
    <div>
      <input
        id="perry"
        type="radio"
        name="who-paid"
        value="perry"
        @change="handlePayerChange('perry')"
        :checked="userWhoPaid === 'perry'"
      />
      <label for="perry">Perry</label>
    </div>
    <div>
      <input
        id="hannah"
        type="radio"
        name="who-paid"
        value="hannah"
        @change="handlePayerChange('hannah')"
        :checked="userWhoPaid === 'hannah'"
      />
      <label for="hannah">Hannah</label>
    </div>
  </fieldset>
  <div>
    <h2>Receipt Photo</h2>
    <input type="file" accept=".jpg,.jpeg" @change="previewImage" />
    <img v-if="imageSrc" :src="imageSrc" alt="Selected Receipt" />
    <p v-else>no image...</p>
    <button :disabled="!selectedFile" @click="analyzeReceipt(selectedFile)">
      分析
    </button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  userWhoPaid: string
  imageSrc: string
  selectedFile: File | null
}>()
const receiptTitle = ref('')
const emit = defineEmits<{
  previewImageEmitTestTodo: [e: Event]
  analyzeReceiptEmitTestTodo: [e: Event]
  'update:userWhoPaid': [value: string] // TODO: 確認必須
  'update:receiptTitle': [value: string] // TODO: 確認必須
}>()
const { getReceiptDataFromReceipt, clearErrorMessage, data, error } =
  useAnalyzeReceipt()

const previewImage = (event: Event) => {
  emit('previewImageEmitTestTodo', event)
}
const analyzeReceipt = async (selectedFile: File | null) => {
  console.log('perry: analyzeReceipt: props.selectedFile: ', props.selectedFile)
  // emit('analyzeReceiptEmitTestTodo', event)
  await getReceiptDataFromReceipt(selectedFile)
}
const getErrorMessage = () => {
  return 'Unknown error occurred'
}
const handlePayerChange = (someText: string) => {
  emit('update:userWhoPaid', someText)
  clearErrorMessage()
}
const handleReceiptTitleChange = () => {
  emit('update:receiptTitle', receiptTitle.value)
  clearErrorMessage()
}
</script>
