import { createError, defineEventHandler, setResponseStatus } from 'h3'
import { $fetch, FetchError } from 'ofetch'

export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch(
      `${process.env.MEMORIES_BACKEND_URL}/api/receipt-info`,
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
        statusMessage: error.data.error_info
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'An error unknown error occurred'
    })
  }
})
