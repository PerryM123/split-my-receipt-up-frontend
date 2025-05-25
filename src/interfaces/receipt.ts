export type BoughtItem = {
  bought_item_id: number
  receipt_id: number
  name: string
  price: number
  payer_name: string
}

// TODO: Shouldn't this be the AnalyzeReceiptResponse instead??
export type ReceiptInfoResponse = {
  message: string
  receipt_info: ReceiptInfo
  error_info?: string
}

export type ReceiptInfo = {
  items: ItemInfo[]
  receipt_total: number
}
export type ItemInfo = {
  name: string
  price_total: number
  who_paid?: string
}

export type MoveToStepTwoPayload = {
  receiptInfo: {
    items: Array<ItemInfo>
    receipt_total: number
  } | null
  receiptTitle: string
  selectedFile: File | null
}
