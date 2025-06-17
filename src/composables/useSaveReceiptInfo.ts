import type { ItemInfo, ReceiptDetailsInfoResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useSaveReceiptInfo = () => {
  const data = ref<ReceiptDetailsInfoResponse | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const saveReceiptData = async (payload: {
    selectedFile: File | null
    receiptTitle: string
    userWhoPaid: string
    receiptTotal: number
    perryTotal: number
    hannahTotal: number
    bothTotalSplitted: number
    boughtItems: ItemInfo[]
  }) => {
    console.log('perry: function saveReceiptData')
    const {
      selectedFile,
      receiptTitle,
      userWhoPaid,
      receiptTotal,
      perryTotal,
      hannahTotal,
      bothTotalSplitted,
      boughtItems
    } = payload
    console.log(
      'perry: getReceiptDataFromReceipt: selectedFile: ',
      selectedFile
    )
    data.value = null
    error.value = null
    if (!selectedFile) {
      console.error('No file selected')
      return {
        data: data.value,
        error: error.value
      }
    }
    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('title', receiptTitle)
    formData.append('user_who_paid', userWhoPaid)
    formData.append('total_amount', `${receiptTotal}`)
    formData.append(
      'person_1_amount',
      `${Math.ceil(perryTotal + bothTotalSplitted)}`
    )
    formData.append(
      'person_2_amount',
      `${Math.floor(hannahTotal + bothTotalSplitted)}`
    )
    formData.append('bought_items', JSON.stringify(boughtItems))
    const {
      data: receiptListData,
      pending,
      error: fetchError
    } = await useAsyncData<ReceiptDetailsInfoResponse>(`save-receipt`, () =>
      $fetch('/api/receipt-info', {
        method: 'POST',
        body: formData
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
    saveReceiptData,
    clearErrorMessage,
    isLoading,
    data,
    error
  }
}
