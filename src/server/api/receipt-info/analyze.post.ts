import {
  createError,
  defineEventHandler,
  readMultipartFormData,
  setResponseStatus
} from 'h3'
import { $fetch, FetchError } from 'ofetch'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No form data received'
      })
    }

    const imageFile = formData.find((item) => item.name === 'image')
    if (!imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No image file found in form data'
      })
    }
    const backendFormData = new FormData()
    backendFormData.append(
      'image',
      new Blob([imageFile.data], { type: imageFile.type }),
      imageFile.filename
    )
    const response = await $fetch(
      `${process.env.MEMORIES_BACKEND_URL}/api/receipt-info/analyze`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        },
        body: backendFormData
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
