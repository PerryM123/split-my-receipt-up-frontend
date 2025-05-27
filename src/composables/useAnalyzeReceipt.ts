import type { ReceiptInfoResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useAnalyzeReceipt = () => {
  const data = ref<ReceiptInfoResponse | null>(null)
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
      data.value = await $fetch(`${getApiBase()}/api/receipt-info/analyze`, {
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
    } finally {
      isLoading.value = false
    }
  }

  const clearErrorMessage = () => {
    error.value = ''
  }

  return {
    getReceiptDataFromReceipt,
    clearErrorMessage,
    isLoading,
    data,
    error
  }
}
