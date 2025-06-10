<template>
  <div>
    <PageTitle>Receipt List</PageTitle>
    <div v-if="isLoading">
      <img src="/loading.gif" alt="receipt list is now loading" />
    </div>
    <div>
      <div
        v-for="(receipt, receiptInfoKey) in receiptPaginationInfo?.receipt_data"
        :key="receiptInfoKey"
        class="mt-5 border-gray-400 pt-5 first:mt-0 [&:not(:first-child)]:border-t"
      >
        <h2 class="text-xl font-bold">{{ receipt.title }}</h2>
        <p class="text-sm">
          <span class="font-bold">Perry: </span>
          {{ formatPrice(receipt.person_1_amount) }}
        </p>
        <p class="text-sm">
          <span class="font-bold">Hannah: </span>
          {{ formatPrice(receipt.person_2_amount) }}
        </p>
        <NuxtLink
          :to="`/receipts/${receipt.receipt_id}`"
          class="mt-4 block rounded-2xl border border-solid border-black bg-gray-300 px-5 py-2 text-center transition-all duration-700 first:mt-0 hover:opacity-30"
        >
          見る
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from '@/components/atoms/PageTitle.vue'

const FIRST_PAGE = 1 as const

const currentPage = ref(FIRST_PAGE)
const isLoading = ref(false)
const { data: receiptPaginationInfo, getReceiptListData } = useGetReceiptList()
await getReceiptListData(currentPage.value)
useHead({
  title: 'Receipt List'
})
</script>
