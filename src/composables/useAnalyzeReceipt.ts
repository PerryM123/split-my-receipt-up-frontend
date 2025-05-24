import { ref } from 'vue'

export const useAnalyzeReceipt = () => {
  const data = ref<string | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const getReceiptDataFromReceipt = async (imageFile: File | null) => {
    console.log('perry: getReceiptDataFromReceipt: imageFile: ', imageFile)
    if (!imageFile) return

    data.value = null
    error.value = null

    const formData = new FormData()
    formData.append('image', imageFile)
    isLoading.value = true
    try {
      await $fetch('http://local.memories.com/api/receipt-info/analyze', {
        method: 'POST',
        body: formData
      })
    } catch (err) {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
      if (err instanceof Error) {
        error.value = err.message
      } else {
        console.error('Unknown error', err)
      }
    }
  }
  const clearErrorMessage = () => {
    error.value = ''
  }

  return { getReceiptDataFromReceipt, clearErrorMessage, data, error }
}
