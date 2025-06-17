<!-- 
 TODO: 
 - Need to make this client-side rendered
 - integrate 多言語 support with i18n
 - Make sure to setup the error handling if the API calls fall through
 - If the item id does not exist, go to error page
-->
<template>
  <div>
    <PageTitle>{{ receiptData?.title }}</PageTitle>
    <h3 class="mt-3 text-lg">
      Payer:
      <span class="text-2xl capitalize">{{ receiptData?.user_who_paid }}</span>
    </h3>
    <ul class="mt-3">
      <li v-for="(totalInfo, key) in personTotals" :key="key" class="text-2xl">
        {{ totalInfo.displayName }}:
        {{ formatPrice(totalInfo.amount) }}
      </li>
    </ul>
    <hr class="mt-3" />
    <div
      v-for="(userBoughtInfo, key) in allUserBoughtInfo"
      :key="key"
      class="mt-3"
    >
      <h3 class="text-xl">
        {{ userBoughtInfo.displayName }}:
        {{ formatPrice(userBoughtInfo.itemsTotal) }}
      </h3>
      <ItemTable
        v-if="userBoughtInfo.boughtItems"
        :bought-items="userBoughtInfo.boughtItems"
      />
      <hr class="mt-3" />
    </div>
    <div class="mt-8">
      <h3 class="text-2xl">レシートの写真</h3>
      <img
        class="mt-3"
        :src="`${getImageUrlBase()}/${receiptData?.image_url}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { USERS } from '@/constants'
import ItemTable from '@/components/atoms/ItemTable.vue'
import PageTitle from '@/components/atoms/PageTitle.vue'

const route = useRoute()
const receiptId = route.params.receipt_id

const { getReceiptData } = useGetReceiptInfo()

const { data: receiptData } = await getReceiptData(Number(receiptId))
const pageTitleText = 'Receipt Details'
useHead({
  title: receiptData?.title
    ? `${receiptData.title} - ${pageTitleText}`
    : pageTitleText
})
// TODO: DRYに書き換えよう
const perryBoughtItemsTotal = computed(() => {
  if (!receiptData?.person_1_bought_items) return 0
  return receiptData.person_1_bought_items.reduce(
    (sum, item) => sum + item.price,
    0
  )
})
const hannahBoughtItemsTotal = computed(() => {
  if (!receiptData?.person_2_bought_items) return 0
  return receiptData.person_2_bought_items.reduce(
    (sum, item) => sum + item.price,
    0
  )
})
const bothBoughtItemsTotal = computed(() => {
  if (!receiptData?.both_bought_items) return 0
  return receiptData.both_bought_items.reduce(
    (sum, item) => sum + item.price,
    0
  )
})
const otherTotal = computed(() => {
  if (receiptData?.total_amount) {
    return (
      receiptData?.total_amount -
      perryBoughtItemsTotal.value -
      hannahBoughtItemsTotal.value -
      bothBoughtItemsTotal.value
    )
  } else {
    // TODO: refactor needed
    return 0
  }
})

const personTotals = computed(() => {
  return receiptData
    ? [
        {
          displayName: USERS.PERRY.DISPLAY_NAME,
          amount: receiptData?.person_1_amount
        },
        {
          displayName: USERS.HANNAH.DISPLAY_NAME,
          amount: receiptData?.person_2_amount
        },
        {
          displayName: 'Total',
          amount: receiptData?.total_amount
        }
      ]
    : []
})
const allUserBoughtInfo = computed(() => {
  return receiptData
    ? [
        {
          displayName: USERS.PERRY.DISPLAY_NAME,
          itemsTotal: perryBoughtItemsTotal.value,
          boughtItems: receiptData.person_1_bought_items
        },
        {
          displayName: USERS.HANNAH.DISPLAY_NAME,
          itemsTotal: hannahBoughtItemsTotal.value,
          boughtItems: receiptData.person_2_bought_items
        },
        {
          displayName: USERS.BOTH.DISPLAY_NAME,
          itemsTotal: bothBoughtItemsTotal.value,
          boughtItems: receiptData.both_bought_items
        },
        {
          displayName: 'その他（税金、割引など）',
          itemsTotal: otherTotal.value
        }
      ]
    : []
})
</script>
