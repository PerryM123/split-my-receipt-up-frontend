import { defineEventHandler, getRouterParam } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const receiptId = getRouterParam(event, 'receipt-id')
  // TODO: エラーハンドリングは対応必須
  const response = await $fetch(
    `${process.env.MEMORIES_BACKEND_URL}/api/receipt-info/${receiptId}`,
    {
      headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` }
    }
  )
  return response
})
