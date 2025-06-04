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
    <h2>{{ receiptData?.title }}</h2>
    <ul>
      <li>
        {{ USERS.PERRY.DISPLAY_NAME }}: {{ receiptData?.person_1_amount }}
      </li>
      <li>
        {{ USERS.HANNAH.DISPLAY_NAME }}: {{ receiptData?.person_2_amount }}
      </li>
      <li>{{ USERS.BOTH.DISPLAY_NAME }}: TODO</li>
    </ul>
    <hr />
    <div>
      <h3>
        {{ USERS.PERRY.DISPLAY_NAME }}: {{ receiptData?.person_1_amount }}
      </h3>
      <ItemTable :bought-items="receiptData?.person_1_bought_items" />
    </div>
    <hr />
    <div>
      <h3>
        {{ USERS.HANNAH.DISPLAY_NAME }}: {{ receiptData?.person_2_amount }}
      </h3>
      <ItemTable :bought-items="receiptData?.person_2_bought_items" />
    </div>
    <hr />
    <div>
      <h3>{{ USERS.BOTH.DISPLAY_NAME }}: TODO</h3>
      <ItemTable :bought-items="receiptData?.both_bought_items" />
    </div>
    <hr />
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
</script>
