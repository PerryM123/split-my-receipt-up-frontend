// TODO: Should get, save, analyze be in seperate composables? Or in the same one?
import type { ReceiptInfoDetailsResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useGetReceiptInfo = () => {
  const data = ref<ReceiptInfoDetailsResponse | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const getReceiptData = async (receiptId: number) => {
    console.log('perry: function getReceiptData')

    try {
      isLoading.value = true
      data.value = await $fetch(
        `${getApiBase()}/api/receipt-info/${receiptId}`,
        { method: 'GET' }
      )
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
    getReceiptData,
    clearErrorMessage,
    isLoading,
    data,
    error
  }
}
