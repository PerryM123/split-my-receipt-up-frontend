import type { ReceiptListInfoResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useGetReceiptList = () => {
  const data = ref<ReceiptListInfoResponse | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const getReceiptListData = async (pageNumber: number) => {
    console.log('perry: function getReceiptData')
    const {
      data: receiptListData,
      pending,
      error: fetchError
    } = await useAsyncData(`receipt-list-${pageNumber}`, () =>
      $fetch<ReceiptListInfoResponse>('/api/receipt-info', {
        method: 'GET',
        params: {
          pages: pageNumber
        },
        headers: { 'Content-Type': 'application/json' }
      })
    )
    isLoading.value = pending.value
    if (fetchError.value) {
      error.value = fetchError.value.message
    }

    return {
      data: receiptListData.value,
      error: error.value
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
