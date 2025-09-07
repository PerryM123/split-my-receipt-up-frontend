<template>
  <div>
    <PageTitle>Receipt List</PageTitle>
    <!-- TODO: 対応必須 -->
    <!-- <LoadingIcon v-if="isLoading" /> -->
    <div>
      <OrderSelectBox
        :receipt-count="receiptInfo?.receipt_count || 0"
        class="mt-5"
        @order-changed="orderChangedTodo"
      />
      <div
        v-for="(receipt, receiptInfoKey) in receiptInfo?.receipt_data"
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
        <p class="text-sm">
          <span class="font-bold">Date Posted: </span>
          {{ formatDate(receipt.created_at) }}
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
import OrderSelectBox from '@/components/molecules/OrderSelectBox.vue'
import { RECEIPT_ORDER } from '@/constants'
import type {
  ReceiptListInfoResponse,
  ReceiptDisplayOrder
} from '@/types/receipt'

definePageMeta({
  layout: 'common-layout'
})
// consts
const FIRST_PAGE = 1 as const
// state
const receiptInfo = ref<ReceiptListInfoResponse | null>()
const currentPage = ref(FIRST_PAGE)
// TODO: 対応必須
// const isLoading = ref(false)
const sortOrder = ref<ReceiptDisplayOrder>(RECEIPT_ORDER.NEWEST)
// composables
const { getReceiptListData } = useGetReceiptList()
const { data: receiptPaginationInfo } = await getReceiptListData(
  currentPage.value,
  sortOrder.value
)
receiptInfo.value = receiptPaginationInfo
// methods
const orderChangedTodo = async (receiptDisplayOrder: ReceiptDisplayOrder) => {
  console.log('perry: orderChddangedTodo: valueTodo: ', receiptDisplayOrder)
  const { data: receiptPaginationInfo } = await getReceiptListData(
    currentPage.value,
    receiptDisplayOrder
  )
  console.log('perry: receiptInfo.value: ', receiptInfo.value)
  receiptInfo.value = receiptPaginationInfo
}
useHead({
  title: 'Receipt List'
})
</script>
