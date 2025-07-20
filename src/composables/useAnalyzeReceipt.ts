import type { AnalyzeReceiptResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useAnalyzeReceipt = () => {
  const data = ref<AnalyzeReceiptResponse | null>(null)
  const error = ref()
  const isLoading = ref<boolean>(false)

  const getReceiptDataFromReceipt = async (imageFile: File | null) => {
    console.log('perry: getReceiptDataFromReceipt: imageFile: ', imageFile)
    if (!imageFile) return { data: null }

    data.value = null
    error.value = null

    const formData = new FormData()
    formData.append('image', imageFile)
    isLoading.value = true
    try {
      const response = await $fetch<AnalyzeReceiptResponse>(
        '/api/receipt-info/analyze',
        {
          method: 'POST',
          body: formData
        }
      )
      data.value = response
      return { data: response }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return { data: null }
    } finally {
      isLoading.value = false
    }
  }

  return {
    getReceiptDataFromReceipt,
    isLoading,
    data,
    error
    // pending
  }
}
