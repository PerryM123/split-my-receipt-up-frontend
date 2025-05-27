import type { ItemInfo, ReceiptInfoResponse } from '@/interfaces/receipt'
import { ref } from 'vue'

export const useSaveReceiptInfo = () => {
  const data = ref<ReceiptInfoResponse | null>(null)
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
    if (!selectedFile) {
      console.error('No file selected')
      return
    }

    data.value = null
    error.value = null

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

    try {
      isLoading.value = true
      data.value = await $fetch(`${getApiBase()}/api/receipt-info`, {
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
    // const receiptInfoResponse: ReceiptInfoResponse = await response.json()
    // receiptInfo = receiptInfoResponse.receipt_info
    // receiptTotal = receiptInfoResponse.receipt_info.receipt_total
    // currentStep.value = STEP_3
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
