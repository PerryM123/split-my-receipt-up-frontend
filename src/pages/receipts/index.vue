<template>
  <div>
    <PageTitle>Receipt List</PageTitle>
    <LoadingIcon v-if="isLoading" />
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
        <BaseButton
          :to="`/receipts/${receipt.receipt_id}`"
          class="mt-4 px-5 py-2 first:mt-0"
        >
          見る
        </BaseButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'
import PageTitle from '@/components/atoms/PageTitle.vue'

definePageMeta({
  layout: 'common-layout'
})

const FIRST_PAGE = 1 as const

const currentPage = ref(FIRST_PAGE)
const isLoading = ref(false)
const { getReceiptListData } = useGetReceiptList()
const { data: receiptPaginationInfo } = await getReceiptListData(
  currentPage.value
)
useHead({
  title: 'Receipt List'
})
</script>
