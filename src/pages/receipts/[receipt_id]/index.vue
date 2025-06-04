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
    <h2 class="text-4xl">{{ receiptData?.title }}</h2>
    <h3 class="mt-3 text-lg">
      Payer:
      <span class="text-2xl capitalize">{{ receiptData?.user_who_paid }}</span>
    </h3>
    <ul class="mt-3">
      <li v-for="(totalInfo, key) in personTotals" :key="key" class="text-2xl">
        {{ totalInfo.displayName }}: {{ formatPrice(totalInfo.amount) }}
      </li>
    </ul>
    <hr class="mt-3" />
    <div>
      <h3>{{ USERS.PERRY.DISPLAY_NAME }}: {{ perryBoughtItemsTotal }}</h3>
      <ItemTable :bought-items="receiptData?.person_1_bought_items" />
    </div>
    <hr />
    <div>
      <h3>{{ USERS.HANNAH.DISPLAY_NAME }}: {{ hannahBoughtItemsTotal }}</h3>
      <ItemTable :bought-items="receiptData?.person_2_bought_items" />
    </div>
    <hr />
    <div>
      <!-- TODO: Need the backend to send the sum of perry/hana/both maybe? -->
      <h3>{{ USERS.BOTH.DISPLAY_NAME }}: {{ bothBoughtItemsTotal }}</h3>
      <ItemTable :bought-items="receiptData?.both_bought_items" />
    </div>
    <hr />
    <div>
      <h3>その他（税金、割引など）: {{ otherTotal }}</h3>
    </div>
    <div>
      <!-- TODO: Make it so that the backend sends over the url without the hostname and let the frontend decide which s3 to send it off to -->
      <img
        :src="
          receiptData?.image_url.replace(
            'http://minio:9000',
            'http://192.168.1.15:9000'
          )
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { USERS } from '@/constants'
import ItemTable from '@/components/atoms/ItemTable.vue'

if (import.meta.server) {
  console.log('This is a server-side log')
}
if (import.meta.client) {
  console.log('This is a client-side log')
}

const route = useRoute()
const receiptId = route.params.receipt_id

const {
  getReceiptData,
  isLoading,
  data: receiptData,
  error
} = useGetReceiptInfo()

await getReceiptData(Number(receiptId))
const perryBoughtItemsTotal = computed(() => {
  if (!receiptData.value?.both_bought_items) return 0
  return receiptData.value.both_bought_items.reduce(
    (sum, item) => sum + item.price,
    0
  )
})
const hannahBoughtItemsTotal = computed(() => {
  if (!receiptData.value?.person_1_bought_items) return 0
  return receiptData.value.person_1_bought_items.reduce(
    (sum, item) => sum + item.price,
    0
  )
})
const bothBoughtItemsTotal = computed(() => {
  if (!receiptData.value?.person_2_bought_items) return 0
  return receiptData.value.person_2_bought_items.reduce(
    (sum, item) => sum + item.price,
    0
  )
})
const otherTotal = computed(() => {
  if (receiptData.value?.total_amount) {
    return (
      receiptData.value?.total_amount -
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
  return receiptData.value
    ? [
        {
          displayName: USERS.PERRY.DISPLAY_NAME,
          amount: receiptData.value?.person_1_amount
        },
        {
          displayName: USERS.HANNAH.DISPLAY_NAME,
          amount: receiptData.value?.person_2_amount
        },
        {
          displayName: 'TOTAL',
          amount: receiptData.value?.total_amount
        }
      ]
    : []
})
</script>
