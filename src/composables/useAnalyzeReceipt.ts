import type { AnalyzeReceiptResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useAnalyzeReceipt = () => {
  const data = ref<AnalyzeReceiptResponse | null>(null)
  // TODO: 変数型は検討中
  const error = ref()
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
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    getReceiptDataFromReceipt,
    isLoading,
    data,
    error
  }
}
