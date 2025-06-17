import {
  createError,
  defineEventHandler,
  setResponseStatus,
  getRouterParam
} from 'h3'
import { $fetch, FetchError } from 'ofetch'

export default defineEventHandler(async (event) => {
  const receiptId = getRouterParam(event, 'receipt-id')
  if (!receiptId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Receipt ID is required'
    })
  }
  const numericReceiptId = Number(receiptId)
  if (!Number.isInteger(numericReceiptId) || numericReceiptId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid receipt ID format'
    })
  }
  try {
    const response = await $fetch(
      `${process.env.MEMORIES_BACKEND_URL}/api/receipt-info/${receiptId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
      }
    )
    setResponseStatus(event, 200)
    return response
  } catch (error: unknown) {
    if (error instanceof FetchError && error.statusCode) {
      console.error({
        statusCode: error.statusCode,
        statusMessage: error.message,
        data: error.data
      })
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.data.error_message
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'An error unknown error occurred'
    })
  }
})
