<!-- 
TODO:
- High priority:
  - [ ] Add validation for input text box and image
  - [ ] Add error pattern for API
  - [ ] Consider having a text box for receipt total amount or an edit button for total amount
  - [ ] Fix bug where there are odd numbers involved (refer to /docs/odd-numbers-bug.png)
  - [ ] Need to verify the math at some point since I think the tax is not being divided properly
  - [ ] Should we just use 
  - [ ] Use <CommonButton> instead of <button>
  - [ ] Make code more DRY
  - [ ] Change naming convention (Edit Item Modal? Add Item Modal? Delete Modal?)

- Low priority:
  - [ ] Add design
  - [ ] Fix nuxt so that it will explicitly import the functions and components instead of doing auto-imports
  - [ ] Need to convert to atomic design soon
  - [ ] Need to do e2e tests for:
    - Save-Receipt
      - [ ] After scanning receipt, are the totals correct?
      - [ ] Editing the item name and price. The totals are still correct?
-->
<template>
  <div>
    <CommonModal
      :is-modal-open="isOpenEditModal"
      @handle-click-black-overlay="handleClickBlackOverlay"
    >
      <template v-if="isOpenEditModal">
        <template v-if="isDeleteModal">
          <div>Are you sure?</div>
          <div>
            <button @click="handleCancelDeleteConfirmation">Cancel</button>
            <button @click="handleAcceptDeleteConfirmation">Delete</button>
          </div>
        </template>
        <template v-else>
          <button @click="handleDeleteItem">Delete Item</button>
          <h2 class="modalTitle">編集</h2>
          <div class="menuItem">
            <p class="menuTitle">Product Name</p>
            <input
              ref="editProductNameRef"
              v-model="editProductName"
              class="inputBox"
              type="text"
              @keydown.enter="editProductNameEnterKey"
            />
          </div>
          <div class="menuItem">
            <p class="menuTitle">Price</p>
            <input
              ref="editPriceRef"
              v-model="editPrice"
              class="inputBox"
              type="number"
              min="0"
              @keydown.enter="editPriceEnterKey"
            />
          </div>
          <div class="butonArea">
            <CommonButton @click="handleModalCancel">キャンセル</CommonButton>
            <CommonButton class="modalActionButton" @click="handleEditItem">
              編集
            </CommonButton>
          </div>
        </template>
      </template>
    </CommonModal>
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
          <li>
            Perry:
            {{ formatPrice(Math.ceil(perryTotal + bothTotalSplitted)) }}
          </li>
          <li>
            Hannah:
            {{ formatPrice(Math.floor(hannahTotal + bothTotalSplitted)) }}
          </li>

          <li>Total: {{ formatPrice(receiptTotal) }}</li>
        </ul>
        <div>
          <button @click="handleOpenAddItemModal">Add Item</button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Who Paid?</th>
            </tr>
            <tr v-for="(item, itemIndex) in receiptInfo.items" :key="itemIndex">
              <td>{{ item.name }}</td>
              <td>{{ formatPrice(item.price_total) }}</td>
              <td>
                <input
                  :id="`perry-${itemIndex}`"
                  v-model="item.who_paid"
                  type="radio"
                  :name="`who-paid-${itemIndex}`"
                  :value="`perry`"
                />
                <label :for="`perry-${itemIndex}`">P</label>
                <input
                  :id="`hannah-${itemIndex}`"
                  v-model="item.who_paid"
                  type="radio"
                  :name="`who-paid-${itemIndex}`"
                  :value="`hannah`"
                />
                <label :for="`hannah-${itemIndex}`">H</label>
                <input
                  :id="`both-${itemIndex}`"
                  v-model="item.who_paid"
                  type="radio"
                  :name="`who-paid-${itemIndex}`"
                  :value="`both`"
                />
                <label :for="`both-${itemIndex}`">両方</label>
              </td>
              <td>
                <button
                  :data-index="itemIndex"
                  :data-user-type="item.who_paid"
                  @click="(event) => handleOpenEditModal(event, item)"
                >
                  Edit
                </button>
              </td>
            </tr>
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
import { USERS } from '@/constants'
import CommonModal from '@/components/organisms/CommonModal.vue'
import CommonButton from '@/components/atoms/CommonButton.vue'

// TODO: Instead of interface, is it better to change to type instead???
interface ReceiptInfo {
  items: ItemInfo[]
  receipt_total: number
}
interface ItemInfo {
  name: string
  price_total: number
  who_paid?: string
}
interface ReceiptInfoResponse {
  message: string
  receipt_info: ReceiptInfo
  error_info?: string
}

const DEFAULT_WHO_PAID = USERS.PERRY.NAME
const imageSrc = ref('')
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)
const receiptTitle = ref('')
const userWhoPaid = ref(DEFAULT_WHO_PAID)
const isOpenAddItemModal = ref(false)
const editProductName = ref()
const editPrice = ref()
const isOpenEditModal = ref(false)
const editProductNameRef = ref()
const editPriceRef = ref()
const indexToEdit = ref<number>(0)
const userToEdit = ref<string>()
const isDeleteModal = ref(false)

const receiptInfo = ref<ReceiptInfo>({
  items: [],
  receipt_total: 0
})
const receiptTotal = ref(0)
const getUserTotal = (whoPaidName: string) => {
  return receiptInfo.value.items.reduce((total, item, index) => {
    if (receiptInfo.value.items[index].who_paid === whoPaidName) {
      return total + item.price_total
    }
    return total
  }, 0)
}
const perryTotal = computed(() => getUserTotal(USERS.PERRY.NAME))
const hannahTotal = computed(() => getUserTotal(USERS.HANNAH.NAME))
const bothTotal = computed(
  () => receiptTotal.value - perryTotal.value - hannahTotal.value
)
const bothTotalSplitted = computed(() => bothTotal.value / 2)
const STEP_1 = 'step1'
const STEP_2 = 'step2'
const STEP_3 = 'step3'
const currentStep = ref(STEP_1)

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
  try {
    isLoading.value = true
    // TODO: maybe axios is better? Or using a composable?
    const response = await fetch(
      'http://local.memories.com/api/receipt-info/analyze',
      {
        method: 'POST',
        body: formData
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const receiptInfoResponse: ReceiptInfoResponse = await response.json()
    receiptInfo.value.items = receiptInfoResponse.receipt_info.items.map(
      (receiptItem) => {
        return {
          name: receiptItem.name,
          price_total: receiptItem.price_total,
          who_paid: USERS.BOTH.NAME
        }
      }
    )

    receiptTotal.value = receiptInfoResponse.receipt_info.receipt_total
    currentStep.value = STEP_2
  } catch (error) {
    console.error('Error analyzing receipt:', error)
  } finally {
    isLoading.value = false
  }
}

const handleOpenAddItemModal = () => {
  console.log('perry: handleOpenAddItemModal function')
  isOpenEditModal.value = true
  isOpenAddItemModal.value = true
}
const seeFinalResults = async () => {
  // TODO: Need validation for items total being high than receipt total
  console.log('perry: seeFinalResults function: ', {
    receiptInfo: receiptInfo.value,
    receiptTotal: receiptTotal.value,
    perryTotal: Math.ceil(perryTotal.value + bothTotalSplitted.value),
    hannahTotal: Math.floor(hannahTotal.value + bothTotalSplitted.value),
    bothTotal: bothTotal.value
  })
  const formData = new FormData()

  if (!selectedFile.value) {
    console.error('No file selected')
    return
  }
  formData.append('image', selectedFile.value)
  formData.append('title', receiptTitle.value)
  formData.append('user_who_paid', userWhoPaid.value)
  formData.append('total_amount', `${receiptTotal.value}`)
  formData.append(
    'person_1_amount',
    `${Math.ceil(perryTotal.value + bothTotalSplitted.value)}`
  )
  formData.append(
    'person_2_amount',
    `${Math.floor(hannahTotal.value + bothTotalSplitted.value)}`
  )
  formData.append('bought_items', JSON.stringify(receiptInfo.value.items))

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
    currentStep.value = STEP_3
  } catch (error) {
    console.error('Error analyzing receipt:', error)
  } finally {
    isLoading.value = false
  }
}
const handleOpenEditModal = (event: MouseEvent, data: ItemInfo) => {
  isOpenEditModal.value = true
  console.log('perry: handleOpenEditModal function: ', {
    event,
    data
  })
  const target = event.target as HTMLInputElement
  indexToEdit.value = Number(target.dataset.index)
  userToEdit.value = target.dataset.userType
  editProductName.value = data.name
  editPrice.value = data.price_total
  isOpenEditModal.value = true
}
const closeModal = () => {
  isOpenEditModal.value = false
  editProductName.value = ''
  editPrice.value = 0
}
const handleClickBlackOverlay = () => {
  closeModal()
}
const editProductNameEnterKey = () => {
  editPriceRef.value.focus()
}
const handleDeleteItem = () => {
  isDeleteModal.value = true
}
const handleEditItem = () => {
  if (isOpenAddItemModal.value) {
    receiptInfo.value.items.push({
      name: editProductName.value,
      price_total: editPrice.value
    })
  } else {
    const index = indexToEdit.value
    receiptInfo.value.items[index].name = editProductName.value
    receiptInfo.value.items[index].price_total = editPrice.value
  }
  closeModal()
}
const editPriceEnterKey = () => {
  handleEditItem()
  editProductNameRef.value.focus()
}
const handleModalCancel = () => {
  isOpenEditModal.value = false
}
const handleAcceptDeleteConfirmation = () => {
  receiptInfo.value.items.splice(indexToEdit.value, 1)
  isDeleteModal.value = false
  closeModal()
}
const handleCancelDeleteConfirmation = () => {
  isDeleteModal.value = false
  closeModal()
}
</script>
