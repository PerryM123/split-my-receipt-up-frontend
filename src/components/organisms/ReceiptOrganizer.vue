<template>
  <div>
    <LoadingIcon v-if="isLoading" />
    <template v-else>
      <ErrorMessage v-if="errorMessage">
        {{ errorMessage }}
      </ErrorMessage>
      <ErrorMessage v-if="isPriceTotalError">
        The items sum is larger than the receipt total. Please fix double check
        the prices
      </ErrorMessage>
      <CommonModal
        :is-modal-open="isOpenEditModal || isEditTotalModelOpen"
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
        <template v-else-if="isEditTotalModelOpen">
          <h2 class="modalTitle">合計編集</h2>
          <div class="menuItem">
            <p class="menuTitle">Total</p>
            <input
              ref="newReceiptTotalRef"
              v-model="newReceiptTotal"
              class="inputBox"
              type="number"
              min="0"
            />
          </div>
          <div class="butonArea">
            <CommonButton @click="handleModalCancel">キャンセル</CommonButton>
            <CommonButton
              class="modalActionButton"
              @click="handleEditReceiptTotal"
            >
              編集
            </CommonButton>
          </div>
        </template>
      </CommonModal>
      <ul class="mt-7">
        <li
          v-for="(itemTotal, keyTotal) in whoPaidTotals"
          :key="keyTotal"
          class="text-2xl"
        >
          {{ itemTotal.name }}:
          {{ itemTotal.formattedPrice }}
        </li>
      </ul>
      <div
        v-for="(buttonItem, key) in ButtonList"
        :key="key"
        class="mt-5 flex justify-center"
      >
        <div class="w-[200px]">
          <BaseButton class="py-1" small @click="buttonItem.clickFunction">
            {{ buttonItem.buttonName }}
          </BaseButton>
        </div>
      </div>
      <table class="mt-4 w-full">
        <tbody>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-center">Price</th>
            <th class="text-left">Who Paid?</th>
          </tr>
          <tr
            v-for="(item, itemIndex) in receiptInfo.items"
            :key="itemIndex"
            class="border-t border-black"
          >
            <td class="w-36 py-2">{{ item.name }}</td>
            <td class="w-24 text-center">
              {{ formatPrice(item.price_total) }}
            </td>
            <td>
              <div class="flex">
                <span
                  v-for="user in totalInfoForWhoPaid(itemIndex)"
                  :key="user.id"
                  class="flex flex-col justify-center"
                >
                  <label class="block w-10 text-center" :for="user.forLabel">{{
                    user.labelText
                  }}</label>
                  <div class="flex justify-center">
                    <input
                      :id="user.forLabel"
                      v-model="item.who_paid"
                      class="block h-5 w-5 accent-teal-500"
                      type="radio"
                      :name="user.name"
                      :value="user.inputValue"
                    />
                  </div>
                </span>
              </div>
            </td>
            <td class="py-2">
              <BaseButton
                class="ml-3 w-auto px-2 py-1"
                :data-index="itemIndex"
                :data-user-type="item.who_paid"
                @click="(event: MouseEvent) => handleOpenEditModal(event, item)"
              >
                Edit
              </BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-5 text-center">
        <BaseButton class="mt-5" @click="seeFinalResults">
          See Final Result
        </BaseButton>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import CommonModal from '@/components/molecules/CommonModal.vue'
import CommonButton from '@/components/atoms/CommonButton.vue'
import { USERS } from '@/constants'
import type {
  ItemInfo,
  MoveToStepThreePayload,
  ReceiptInfo
} from '@/interfaces/receipt'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'
import LoadingIcon from '@/components/atoms/LoadingIcon.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const { receiptTotal, receiptInfo, selectedFile, receiptTitle, userWhoPaid } =
  defineProps<{
    receiptInfo: ReceiptInfo
    receiptTotal: number
    selectedFile: File | null
    receiptTitle: string
    userWhoPaid: string
  }>()

const emit = defineEmits<{
  'update:receipt-info': [ReceiptInfo]
  'update:receipt-total': [number]
  moveToStepThree: [MoveToStepThreePayload]
}>()
// composables
const { saveReceiptData, isLoading } = useSaveReceiptInfo()
// states
const isDeleteModal = ref(false)
const isEditTotalModelOpen = ref(false)
const isOpenAddItemModal = ref(false)
const editProductName = ref()
const editPrice = ref()
const isOpenEditModal = ref(false)
const userToEdit = ref<string>()
const editProductNameRef = ref()
const editPriceRef = ref()
const indexToEdit = ref<number>(0)
const newReceiptTotalRef = ref(false)
const newReceiptTotal = ref(0)
const errorMessage = ref('')
// computed functions
const perryTotal = computed(() => getUserTotal(USERS.PERRY.NAME))
const hannahTotal = computed(() => getUserTotal(USERS.HANNAH.NAME))
const bothTotal = computed(
  () => receiptTotal - perryTotal.value - hannahTotal.value
)
const whoPaidTotals = computed(() => [
  {
    name: USERS.PERRY.DISPLAY_NAME,
    formattedPrice: formatPrice(
      Math.ceil(perryTotal.value + bothTotalSplitted.value)
    )
  },
  {
    name: USERS.HANNAH.DISPLAY_NAME,
    formattedPrice: formatPrice(
      Math.floor(hannahTotal.value + bothTotalSplitted.value)
    )
  },
  {
    name: USERS.BOTH.DISPLAY_NAME,
    formattedPrice: formatPrice(receiptTotal)
  }
])
const bothTotalSplitted = computed(() => bothTotal.value / 2)
const perryBoughtItemsTotal = computed(() => {
  if (!receiptInfo.items) return 0
  return receiptInfo.items.reduce((sum, item) => sum + item.price_total, 0)
})
const isPriceTotalError = computed(() => {
  return perryBoughtItemsTotal.value > receiptTotal
})
// functions
const handleOpenAddItemModal = () => {
  isOpenEditModal.value = true
  isOpenAddItemModal.value = true
}
const handleOpenEditTotalModal = () => {
  isEditTotalModelOpen.value = true
  newReceiptTotal.value = receiptTotal
}
const seeFinalResults = async () => {
  console.log('perry: seeFinalResults function: ', {
    receiptInfo: receiptInfo,
    receiptTotal: receiptTotal,
    perryTotal: Math.ceil(perryTotal.value + bothTotalSplitted.value),
    hannahTotal: Math.floor(hannahTotal.value + bothTotalSplitted.value),
    bothTotal: bothTotal.value
  })

  const { data: savedReceiptData } = await saveReceiptData({
    selectedFile,
    receiptTitle,
    userWhoPaid,
    receiptTotal,
    perryTotal: perryTotal.value,
    hannahTotal: hannahTotal.value,
    bothTotalSplitted: bothTotalSplitted.value,
    boughtItems: receiptInfo.items
  })
  if (!savedReceiptData?.receipt_id) {
    errorMessage.value = 'An error occurred. Please try again at another time.'
    scrollToTop()
    return
  }
  emit('moveToStepThree', {
    receiptId: savedReceiptData?.receipt_id,
    receiptTitle
  })
}
const handleOpenEditModal = (event: MouseEvent, data: ItemInfo) => {
  isOpenEditModal.value = true
  const target = event.target as HTMLInputElement
  indexToEdit.value = Number(target.dataset.index)
  userToEdit.value = target.dataset.userType
  editProductName.value = data.name
  editPrice.value = data.price_total
  isOpenEditModal.value = true
}
const totalInfoForWhoPaid = (itemIndex: number) => [
  {
    forLabel: `${USERS.PERRY.NAME}-${itemIndex}`,
    id: `${USERS.PERRY.NAME}-${itemIndex}`,
    name: `who-paid-${itemIndex}`,
    inputValue: USERS.PERRY.NAME,
    labelText: USERS.PERRY.DISPLAY_NAME.slice(0, 1)
  },
  {
    forLabel: `${USERS.HANNAH.NAME}-${itemIndex}`,
    id: `${USERS.HANNAH.NAME}-${itemIndex}`,
    name: `who-paid-${itemIndex}`,
    inputValue: USERS.HANNAH.NAME,
    labelText: USERS.HANNAH.DISPLAY_NAME.slice(0, 1)
  },
  {
    forLabel: `${USERS.BOTH.NAME}-${itemIndex}`,
    id: `${USERS.BOTH.NAME}-${itemIndex}`,
    name: `who-paid-${itemIndex}`,
    inputValue: USERS.BOTH.NAME,
    labelText: '両方'
  }
]
const getUserTotal = (whoPaidName: string) => {
  return receiptInfo.items.reduce((total, item, index) => {
    if (receiptInfo.items[index].who_paid === whoPaidName) {
      return total + item.price_total
    }
    return total
  }, 0)
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
const closeModal = () => {
  isOpenEditModal.value = false
  isEditTotalModelOpen.value = false
  editProductName.value = ''
  editPrice.value = 0
}
const handleEditItem = () => {
  const updatedReceiptInfo = { ...receiptInfo }
  if (isOpenAddItemModal.value) {
    updatedReceiptInfo.items.push({
      name: editProductName.value,
      price_total: editPrice.value,
      who_paid: USERS.BOTH.NAME
    })
  } else {
    const index = indexToEdit.value
    updatedReceiptInfo.items[index] = {
      ...updatedReceiptInfo.items[index],
      name: editProductName.value,
      price_total: editPrice.value
    }
  }
  emit('update:receipt-info', updatedReceiptInfo)
  closeModal()
}
const handleEditReceiptTotal = () => {
  emit('update:receipt-total', newReceiptTotal.value)
  closeModal()
}
const editPriceEnterKey = () => {
  handleEditItem()
  editProductNameRef.value.focus()
}
const handleModalCancel = () => {
  isOpenEditModal.value = false
  isEditTotalModelOpen.value = false
}
const handleAcceptDeleteConfirmation = () => {
  const updatedReceiptInfo = { ...receiptInfo }
  updatedReceiptInfo.items.splice(indexToEdit.value, 1)
  emit('update:receipt-info', updatedReceiptInfo)
  isDeleteModal.value = false
  closeModal()
}
const handleCancelDeleteConfirmation = () => {
  isDeleteModal.value = false
  closeModal()
}
// HTML Details
const ButtonList = [
  {
    buttonName: 'Edit Total',
    clickFunction: handleOpenEditTotalModal
  },
  {
    buttonName: 'Add Item',
    clickFunction: handleOpenAddItemModal
  }
]
</script>
