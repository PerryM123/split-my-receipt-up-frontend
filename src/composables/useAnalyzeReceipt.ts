import type { AnalyzeReceiptResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useAnalyzeReceipt = () => {
  const data = ref<AnalyzeReceiptResponse | null>(null)
  // TODO: 変数型は検討中
  const error = ref()
  const isLoading = ref<boolean>(false)

  const getReceiptDataFromReceipt = async (imageFile: File | null) => {
    console.log('perry: getReceiptDataFromReceipt: imageFile: ', imageFile)
    if (!imageFile) return { data: null }

    data.value = null
    error.value = null

    const formData = new FormData()
    formData.append('image', imageFile)
    const {
      pending,
      error: fetchError,
      data: returnData
    } = await useAsyncData<AnalyzeReceiptResponse>('analyze-receipt', () =>
      $fetch('/api/receipt-info/analyze', {
        method: 'POST',
        body: formData
      })
    )
    isLoading.value = pending.value
    if (fetchError.value) {
      error.value = fetchError.value.message
    }
    return {
      data: returnData.value
    }
  }

  return {
    getReceiptDataFromReceipt,
    isLoading,
    data,
    error
  }
}
