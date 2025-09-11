import { RECEIPT_ORDER } from '@/constants'
import type {
  ReceiptListInfoResponse,
  ReceiptDisplayOrder
} from '@/types/receipt'
import { ref } from 'vue'

const SORT_TYPE = {
  ASCENDING: 'asc',
  DESCENDING: 'desc'
} as const

export const useGetReceiptList = () => {
  const data = ref<ReceiptListInfoResponse | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const getSortByOrderParam = (sortOrder: ReceiptDisplayOrder) => {
    console.log('perry: sortOrder: getSortByOrderParam: ', sortOrder)
    switch (sortOrder) {
      case RECEIPT_ORDER.NEWEST:
        console.log('perry: getSortByOrderParam: case RECEIPT_ORDER.NEWEST:')
        return SORT_TYPE.DESCENDING
      case RECEIPT_ORDER.OLDEST:
        console.log('perry: getSortByOrderParam: case RECEIPT_ORDER.OLDEST:')
        return SORT_TYPE.ASCENDING
      default:
        console.log('perry: getSortByOrderParam: default:')
        return SORT_TYPE.DESCENDING
    }
  }

  const getReceiptListData = async (
    pageNumber: number,
    sortOrder: ReceiptDisplayOrder
  ) => {
    console.log('perry: function getReceiptData')
    isLoading.value = true
    // TODO: dev tools error: useGetReceiptListInfo.ts:39 [nuxt] [useAsyncData] Component is already mounted, please use $fetch instead. See
    const { data: receiptListData, error: fetchError } = await useAsyncData(
      `receipt-list-${pageNumber}-${sortOrder}`,
      () =>
        $fetch<ReceiptListInfoResponse>('/api/receipt-info', {
          method: 'GET',
          params: {
            pages: pageNumber,
            sort_by: getSortByOrderParam(sortOrder)
          },
          headers: { 'Content-Type': 'application/json' }
        })
    )
    isLoading.value = false
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
