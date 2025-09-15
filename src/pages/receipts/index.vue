<template>
  <div>
    <PageTitle>Receipt List</PageTitle>
    <div>
      <OrderSelectBox
        :receipt-count="receiptInfo?.receipt_count || 0"
        :min-count-todo="minCountTodo"
        :max-count-todo="maxCountTodo"
        class="mt-5"
        @order-changed="orderChangedTodo"
      />
      <div v-if="isLoading" class="mt-5 flex items-center justify-center">
        <LoadingIcon />
      </div>
      <template v-else>
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
      </template>
      <!-- TODO: コンポーネント化する必要ある -->
      <div
        class="mt-5 flex items-center justify-between border-t border-gray-400 pt-4"
      >
        <button
          class="font-bold disabled:opacity-50"
          :disabled="isOnFirstPage"
          @click="changePage(currentPage - 1)"
        >
          前
        </button>
        <div class="flex">
          <button
            v-for="pageNumber in lastPage"
            :key="pageNumber"
            class="mr-1 flex h-11 w-11 items-center justify-center rounded-full bg-gray-400 text-white last:mr-0 hover:opacity-80"
            :class="{ 'bg-teal-600': pageNumber === currentPage }"
            @click="() => changePage(pageNumber)"
          >
            {{ pageNumber }}
          </button>
        </div>
        <button
          class="font-bold disabled:opacity-50"
          :disabled="isOnLastPage"
          @click="changePage(currentPage + 1)"
        >
          次
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'
import PageTitle from '@/components/atoms/PageTitle.vue'
import OrderSelectBox from '@/components/molecules/OrderSelectBox.vue'
import LoadingIcon from '@/components/atoms/LoadingIcon.vue'
import { RECEIPT_ORDER } from '@/constants'
import type {
  ReceiptListInfoResponse,
  ReceiptDisplayOrder
} from '@/types/receipt'

definePageMeta({
  layout: 'common-layout'
})
const route = useRoute()
// constants
const FIRST_PAGE = 1 as const
const MAX_RECEIPT_LIST_ITEMS_PER_PAGE = 10 as const
const OFFSET_FOR_MIN_COUNT_TODO = 9
// state
const receiptInfo = ref<ReceiptListInfoResponse | null>()
const currentPage = ref<number>(
  route.query.page ? Number(route.query.page as string) : FIRST_PAGE
)
const lastPage = ref<number>()
const isLoading = ref(false)
const sortOrder = ref<ReceiptDisplayOrder>(RECEIPT_ORDER.NEWEST)
// composables
useHead({
  title: 'Receipt List'
})
const { getReceiptListData } = useGetReceiptList()
const { data: receiptPaginationInfo } = await getReceiptListData(
  currentPage.value,
  sortOrder.value
)
receiptInfo.value = receiptPaginationInfo
lastPage.value = receiptPaginationInfo?.page_count
// computed
const isOnFirstPage = computed(() => currentPage.value === FIRST_PAGE)
const isOnLastPage = computed(
  () => currentPage.value === receiptInfo.value?.page_count
)
const minCountTodo = computed(
  () =>
    currentPage.value * MAX_RECEIPT_LIST_ITEMS_PER_PAGE -
    OFFSET_FOR_MIN_COUNT_TODO
)
const maxCountTodo = computed(() =>
  isOnLastPage.value
    ? receiptInfo.value?.receipt_count
    : currentPage.value * MAX_RECEIPT_LIST_ITEMS_PER_PAGE
)
// methods
const orderChangedTodo = async (receiptDisplayOrder: ReceiptDisplayOrder) => {
  console.log(
    'perry: orderChangedTodo: receiptDisplayOrder: ',
    receiptDisplayOrder
  )
  const { data: receiptPaginationInfo } = await getReceiptListData(
    FIRST_PAGE,
    receiptDisplayOrder as ReceiptDisplayOrder
  )
  receiptInfo.value = receiptPaginationInfo
  sortOrder.value = receiptDisplayOrder
  currentPage.value = FIRST_PAGE
}
const changePage = async (clickedPageNumber: number) => {
  isLoading.value = true
  try {
    // TODO: Double check how navigateTo works
    await navigateTo({
      path: route.path,
      query: {
        ...route.query,
        page: clickedPageNumber
      }
    })
    const { data: receiptPaginationInfo } = await getReceiptListData(
      clickedPageNumber,
      sortOrder.value
    )
    currentPage.value = clickedPageNumber
    receiptInfo.value = receiptPaginationInfo
  } catch (error) {
    // TODO: エラーパターン追加必須
    console.log('perry: error: ', error)
  } finally {
    isLoading.value = false
  }
}
</script>
