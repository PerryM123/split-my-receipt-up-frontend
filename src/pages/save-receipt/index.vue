<!-- 
TODO:
- High priority:
  - [ ] Add validation for input text box and image
  - [ ] Consider having a text box for receipt total amount

- Low priority:
  - [ ] Add design
  - [ ] Fix nuxt so that it will explicitly import the functions and components instead of doing auto-imports
  - [ ] Need to convert to atomic design soon
-->
<template>
  <div>
    <img v-if="isLoading" src="/loading.gif" alt="Analyzing Receipt" />
    <template v-else-if="currentStep === STEP_1">
      <!-- TODO: Make a component of the 1st step -->
      <h2>レシート保存</h2>
      <p>Receipt Title</p>
      <input v-model="receiptTitle" />

      <fieldset>
        <legend>Who paid?</legend>
        <div>
          <input
            id="perry"
            v-model="userWhoPaid"
            type="radio"
            name="who-paid"
            value="perry"
            checked
          />
          <label for="perry">Perry</label>
        </div>
        <div>
          <input
            id="hannah"
            v-model="userWhoPaid"
            type="radio"
            name="who-paid"
            value="hannah"
          />
          <label for="hannah">Hannah</label>
        </div>
      </fieldset>
      <div>
        <h2>Receipt Photo</h2>
        <input type="file" accept=".jpg,.jpeg" @change="previewImage" />
        <img v-if="imageSrc" :src="imageSrc" alt="Selected Receipt" />
        <p v-else>no image...</p>
        <button :disabled="!selectedFile" @click="analyzeReceipt">分析</button>
      </div>
    </template>
    <template v-else-if="currentStep === STEP_2">
      <h2>Scanned Items</h2>
      <div>
        <ul>
          <li>Perry: 260円</li>
          <li>Hannah: 260円</li>
          <li>Total: {{ formatPrice(receiptTotal) }}</li>
        </ul>
        <div>
          <button @click="addScannedItem">Add Item</button>
        </div>
        <table class="theActualPriceTable">
          <tbody>
            <tr class="tableRow">
              <th>Name</th>
              <th>Price</th>
            </tr>
            <template v-for="(person, personIndex) in [hannahData, perryData]">
              <tr
                v-for="(item, itemIndex) in person.items"
                :key="itemIndex"
                class="tableRow"
                :class="`tableRow__person${personIndex}`"
              >
                <td>{{ item.productName }}</td>
                <td>{{ formatPrice(item.price) }}</td>
                <td class="buttonTableItem">
                  <button
                    :data-index="itemIndex"
                    :data-user-type="person.name"
                    class="editButton"
                    @click="(event) => handleOpenEditModal(event, item)"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div>
          <button @click="seeFinalResults">See Final Result</button>
        </div>
      </div>
    </template>
    <template v-else-if="currentStep === STEP_3">
      <div>this is step 3</div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { USERS } from '~/constants'
import type { ItemData, ShoppingData } from '~/interfaces/shopping'

// TODO: Change to type instead???
interface ReceiptInfo {
  item: ItemInfo[]
  receipt_total: number
}
interface ItemInfo {
  name: string
  price_total: number
}
interface ReceiptInfoResponse {
  message: string
  receipt_info: ReceiptInfo
  error_info?: string
}

const DEFAULT_WHO_PAID = 'perry'
const imageSrc = ref('')
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)
const receiptTitle = ref('')
const userWhoPaid = ref(DEFAULT_WHO_PAID)
const receiptInfo = ref<ReceiptInfo>()
const receiptTotal = ref(0)
const perryData = ref<ShoppingData>({
  displayName: USERS.PERRY.DISPLAY_NAME,
  name: USERS.PERRY.NAME,
  items: []
})
const hannahData = ref<ShoppingData>({
  displayName: USERS.HANNAH.DISPLAY_NAME,
  name: USERS.HANNAH.NAME,
  items: []
})

const STEP_1 = 'step1'
const STEP_2 = 'step2'
const STEP_3 = 'step3'
// TODO: Change back to STEP_1 after debugging
let currentStep = STEP_2

const previewImage = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) {
    return
  }
  imageSrc.value = URL.createObjectURL(file)
  selectedFile.value = file
}

const analyzeReceipt = async () => {
  if (!selectedFile.value) {
    console.error('No file selected')
    return
  }
  const formData = new FormData()
  formData.append('image', selectedFile.value)
  formData.append('title', receiptTitle.value)
  formData.append('user_who_paid', userWhoPaid.value)
  try {
    isLoading.value = true
    // TODO: maybe axios is better? Or using a composable?
    const response = await fetch('http://local.memories.com/api/receipt-info', {
      method: 'POST',
      body: formData
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const receiptInfoResponse: ReceiptInfoResponse = await response.json()
    receiptInfo.value = receiptInfoResponse.receipt_info
    receiptTotal.value = receiptInfoResponse.receipt_info.receipt_total
    currentStep = STEP_2
  } catch (error) {
    console.error('Error analyzing receipt:', error)
  } finally {
    isLoading.value = false
  }
}

const addScannedItem = () => {
  console.log('perry: addScannedItem function')
}
const seeFinalResults = () => {
  console.log('perry: seeFinalResults function')
}
const handleOpenEditModal = (event: MouseEvent, data: ItemData) => {
  console.log('perry: handleOpenEditModal function: ', {
    event,
    data
  })
}
</script>
