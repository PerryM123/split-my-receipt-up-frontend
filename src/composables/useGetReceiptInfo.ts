import type { ReceiptDetailsInfoResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useGetReceiptInfo = () => {
  const data = ref<ReceiptDetailsInfoResponse | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const getReceiptData = async (receiptId: number) => {
    console.log('perry: function getReceiptData')
    const {
      data: receiptDetailsData,
      pending,
      error: fetchError
    } = await useAsyncData(`receipt-id-${receiptId}`, () =>
      $fetch<ReceiptDetailsInfoResponse>(`/api/receipt-info/${receiptId}`, {
        method: 'GET',
        params: {
          pages: receiptId
        },
        headers: { 'Content-Type': 'application/json' }
      })
    )
    isLoading.value = pending.value
    if (fetchError.value) {
      error.value = fetchError.value.message
    }

    return {
      data: receiptDetailsData.value,
      error: error.value
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
