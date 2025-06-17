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
    // TODO: FormData周りの重複コードが多く修正必須
    const backendFormData = new FormData()
    backendFormData.append(
      'image',
      new Blob([imageFile.data], { type: imageFile.type }),
      imageFile.filename
    )
    const title = formData
      .find((item) => item.name === 'title')
      ?.data.toString()
    const userWhoPaid = formData
      .find((item) => item.name === 'user_who_paid')
      ?.data.toString()
    const totalAmount = formData
      .find((item) => item.name === 'total_amount')
      ?.data.toString()
    const person1Amount = formData
      .find((item) => item.name === 'person_1_amount')
      ?.data.toString()
    const person2Amount = formData
      .find((item) => item.name === 'person_2_amount')
      ?.data.toString()
    const boughtItems = formData
      .find((item) => item.name === 'bought_items')
      ?.data.toString()

    if (title) backendFormData.append('title', title)
    if (userWhoPaid) backendFormData.append('user_who_paid', userWhoPaid)
    if (totalAmount) backendFormData.append('total_amount', totalAmount)
    if (person1Amount) backendFormData.append('person_1_amount', person1Amount)
    if (person2Amount) backendFormData.append('person_2_amount', person2Amount)
    if (boughtItems) backendFormData.append('bought_items', boughtItems)

    const response = await $fetch(
      `${process.env.MEMORIES_BACKEND_URL}/api/receipt-info`,
      {
        method: 'POST',
        body: backendFormData,
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
      }
    )
    setResponseStatus(event, 201)
    return response
  } catch (error: unknown) {
    if (error instanceof FetchError) {
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
