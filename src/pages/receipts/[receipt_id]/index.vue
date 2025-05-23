<!-- 
 TODO: 
 - Need to make this client-side rendered
 - integrate 多言語 support with i18n
 - Make sure to setup the error handling if the API calls fall through
 - If there are no items for person1, person2, or both, show a message saying "no items"
 - If the item id does not exist, show No Receipt Info
-->
<template>
  <div>
    <h2>{{ receiptDetails?.title }}</h2>
    <ul>
      <li>
        {{ USERS.PERRY.DISPLAY_NAME }}: {{ receiptDetails?.person_1_amount }}
      </li>
      <li>
        {{ USERS.HANNAH.DISPLAY_NAME }}: {{ receiptDetails?.person_2_amount }}
      </li>
      <li>{{ USERS.BOTH.DISPLAY_NAME }}: TODO</li>
    </ul>
    <hr />
    <div>
      <h3>
        {{ USERS.PERRY.DISPLAY_NAME }}: {{ receiptDetails?.person_1_amount }}
      </h3>
      <ItemTable :bought-items="receiptDetails?.person_1_bought_items" />
    </div>
    <hr />
    <div>
      <h3>
        {{ USERS.HANNAH.DISPLAY_NAME }}: {{ receiptDetails?.person_2_amount }}
      </h3>
      <ItemTable :bought-items="receiptDetails?.person_2_bought_items" />
    </div>
    <hr />
    <div>
      <h3>{{ USERS.BOTH.DISPLAY_NAME }}: TODO</h3>
      <ItemTable :bought-items="receiptDetails?.both_bought_items" />
    </div>
    <hr />
    <div>
      <img :src="receiptDetails?.image_url" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BoughtItem } from '@/interfaces/receipt'
import { useRoute } from 'vue-router'
import { USERS } from '@/constants'
import ItemTable from '@/components/atoms/ItemTable.vue'

type ReceiptInfoDetailsResponse = {
  receipt_id: number
  title: string
  image_url: string
  user_who_paid: string
  total_amount: number
  person_1_amount: number
  person_2_amount: number
  person_1_bought_items: BoughtItem[]
  person_2_bought_items: BoughtItem[]
  both_bought_items: BoughtItem[]
}
if (import.meta.server) {
  console.log('This is a server-side log')
}
if (import.meta.client) {
  console.log('This is a client-side log')
}

const isLoading = ref(false)
const route = useRoute()
const receiptId = route.params.receipt_id
const receiptDetails = ref<ReceiptInfoDetailsResponse>()
try {
  isLoading.value = true
  // TODO: maybe axios is better? Or using a composable?
  const response = await fetch(
    `http://local.memories.com/api/receipt-info/${receiptId}`,
    { method: 'GET' }
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const receiptInfoDetailsResponse: ReceiptInfoDetailsResponse =
    await response.json()
  receiptDetails.value = receiptInfoDetailsResponse
  console.log(receiptDetails.value)
} catch (error) {
  console.error('Error analyzing receipt:', error)
} finally {
  isLoading.value = false
}
</script>
