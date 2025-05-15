<template>
  <div>
    <h1>Receipt List</h1>
    <!-- TODO: loading icon is not appearing because of ssr??? -->
    <div v-if="isLoading">
      <img src="/loading.gif" alt="receipt list is now loading" />
    </div>
    <div
      v-for="(receipt, receiptInfoKey) in receiptInfoResponse.receipt_data"
      :key="receiptInfoKey"
      class="border-t border-black p-5"
    >
      <h2>{{ receipt.title }}</h2>
      <p>person 1: {{ receipt.image_url }}</p>
      <p>person 2: {{ receipt.image_url }}</p>
      <NuxtLink :to="`/receipts/${receipt.receipt_id}`">見る</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
type ReceiptInfoResponse = {
  receipt_data: ReceiptData[]
  total: number
}

type ReceiptData = {
  receipt_id: number
  title: string
  image_url: string
  user_who_paid: string
  total_amount: number
  created_at: string | null
  updated_at: string | null
}

const currentPage = ref(1)
const isLoading = ref(false)
const response = await fetch(
  `http://local.memories.com/api/receipt-info?page=${currentPage.value}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}
const receiptInfoResponse: ReceiptInfoResponse = await response.json()
console.log('receiptInfoResponse: ', receiptInfoResponse)
console.log(
  'receiptInfoResponse.receipt_data: ',
  receiptInfoResponse.receipt_data
)
console.log('receiptInfoResponse.total: ', receiptInfoResponse.total)
</script>
