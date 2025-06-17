import { defineEventHandler } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async () => {
  // TODO: エラーハンドリングは対応必須
  const response = await $fetch(
    `${process.env.MEMORIES_BACKEND_URL}/api/receipt-info`,
    {
      headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` }
    }
  )
  return response
})
