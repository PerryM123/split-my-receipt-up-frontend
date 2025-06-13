export type SplitReceiptInfoResponse = {
  receipt_id: number
  title: string
  image_url: string
  user_who_paid: string
  total_amount: number
  person_1_amount: number
  person_2_amount: number
  created_at: string
  updated_at: string
}

export type ReceiptDetailsInfoResponse = SplitReceiptInfoResponse &
  ReceiptBoughtInfoResponse

export type ReceiptBoughtInfoResponse = {
  person_1_bought_items: BoughtItem[]
  person_2_bought_items: BoughtItem[]
  both_bought_items: BoughtItem[]
}

export type BoughtItem = {
  bought_item_id: number
  receipt_id: number
  name: string
  price: number
  payer_name: string
}

export type AnalyzeReceiptResponse = {
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

// TODO: Need a better name
export type MoveToStepTwoPayload = {
  receiptInfo: {
    items: Array<ItemInfo>
    receipt_total: number
  } | null
  receiptTitle: string
  selectedFile: File | null
}
// TODO: Need a better name
export type MoveToStepThreePayload = {
  receiptId: number
  receiptTitle: string
}

export type ReceiptListInfoResponse = {
  receipt_data: SplitReceiptInfoResponse[]
  receipt_count: number
}
