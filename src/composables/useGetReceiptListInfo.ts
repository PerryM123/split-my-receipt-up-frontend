import type { ReceiptListInfoResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useGetReceiptList = () => {
  const data = ref<ReceiptListInfoResponse | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const getReceiptListData = async (pageNumber: number) => {
    console.log('perry: function getReceiptData')

    try {
      isLoading.value = true
      data.value = await $fetch(`${getApiBase()}/api/receipt-info`, {
        method: 'GET',
        params: {
          pages: pageNumber
        },
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err) {
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
    getReceiptListData,
    clearErrorMessage,
    isLoading,
    data,
    error
  }
}
