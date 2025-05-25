<!-- 
    TODO:
    - High priority:
      - [ ] Add an edit button incase the Total amount is misread from OpenAI API 
      - [ ] Add validation for input text box and image
      - [ ] Add error pattern for API
      - [ ] Consider having a text box for receipt total amount or an edit button for total amount
      - [ ] Fix bug where there are odd numbers involved (refer to /docs/odd-numbers-bug.png)
      - [ ] Need to verify the math at some point since I think the tax is not being divided properly
      - [ ] Should we just use 
      - [ ] Use <CommonButton> instead of <button>
      - [ ] Make code more DRY
      - [ ] Change naming convention (Edit Item Modal? Add Item Modal? Delete Modal?)
      - [ ] Need validation for items total being high than receipt total
      - [ ] Fix broken models
    
    - Low priority:
      - [ ] Need a common header... Need an about page???
      - [ ] Add design
      - [ ] Need to convert to atomic design soon
      - [ ] Need to do e2e tests for:
        - Save-Receipt
          - [ ] After scanning receipt, are the totals correct?
          - [ ] Editing the item name and price. The totals are still correct?
    -->
<template>
  <div>
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
            ref="fakeTotalRef"
            v-model="fakeTotal"
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
    <PageTitle>レシート保存</PageTitle>
    <img v-if="isLoading" src="/loading.gif" alt="Analyzing Receipt" />
    <SavePreparation
      v-else-if="currentStep === STEP_1"
      v-model:user-who-paid="userWhoPaid"
      @move-to-step-two="moveToStepTwo"
    />
    <template v-else-if="currentStep === STEP_2">
      <div>
        <ul class="mt-7">
          <li
            v-for="(itemTotal, keyTotal) in whoPaidTotals"
            :key="keyTotal"
            class="text-4xl"
          >
            {{ itemTotal.name }}:
            {{ itemTotal.formattedPrice }}
          </li>
        </ul>
        <div class="mt-5 text-center">
          <button
            class="mt-5 w-40 rounded-full border border-solid border-black bg-gray-300 px-1 py-1 text-center font-bold transition-all duration-700 first:mt-0 hover:opacity-30"
            @click="handleOpenEditTotalModal"
          >
            Edit Total
          </button>
        </div>
        <div class="mt-5 text-center">
          <button
            class="mt-5 w-40 rounded-full border border-solid border-black bg-gray-300 px-1 py-1 text-center font-bold transition-all duration-700 first:mt-0 hover:opacity-30"
            @click="handleOpenAddItemModal"
          >
            Add Item
          </button>
        </div>
        <table class="mt-4">
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
                    <label
                      class="block w-10 text-center"
                      :for="user.forLabel"
                      >{{ user.labelText }}</label
                    >
                    <div class="flex justify-center">
                      <input
                        :id="user.forLabel"
                        v-model="item.who_paid"
                        class="block h-5 w-5"
                        type="radio"
                        :name="user.name"
                        :value="user.inputValue"
                      />
                    </div>
                  </span>
                </div>
              </td>
              <td>
                <button
                  class="ml-3 mt-5 rounded-full border border-solid border-black bg-gray-300 px-2 py-1 text-center font-bold transition-all duration-700 first:mt-0 hover:opacity-30"
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
        <div class="mt-5 text-center">
          <button
            class="mt-5 w-full rounded-full border border-solid border-black bg-gray-300 px-1 py-4 text-center font-bold transition-all duration-700 first:mt-0 hover:opacity-30"
            @click="seeFinalResults"
          >
            See Final Result
          </button>
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
import SavePreparation from '@/components/molecules/SavePreparation.vue'
import PageTitle from '@/components/atoms/PageTitle.vue'
import type {
  ItemInfo,
  MoveToStepTwoPayload,
  ReceiptInfo
} from '@/interfaces/receipt'

const DEFAULT_WHO_PAID = USERS.PERRY.NAME
const isLoading = ref(false)
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
const isEditTotalModelOpen = ref(false)
const fakeTotalRef = ref(false)
const fakeTotal = ref(0)

// const receiptInfo = ref<ReceiptInfo>({
//   items: [],
//   receipt_total: 0
// })
// TODO: Testing. When finished, comment out the line above
const receiptInfo = ref<ReceiptInfo>({
  items: [
    {
      name: 'ハーゲンミニCロウチャクリキーウカ',
      price_total: 218,
      who_paid: 'both'
    },
    {
      name: 'オリジナルスフラッドオレンジ',
      price_total: 204,
      who_paid: 'both'
    },
    {
      name: 'オカメ スコイサットS-903',
      price_total: 264,
      who_paid: 'both'
    },
    {
      name: 'アタックウオシEXヘヤカカ850g',
      price_total: 308,
      who_paid: 'both'
    },
    {
      name: 'コウサンウオトンジヤ玉150×3',
      price_total: 78,
      who_paid: 'both'
    },
    {
      name: 'セブンスターリサンゴールド',
      price_total: 499,
      who_paid: 'both'
    },
    {
      name: 'ワイドハイターEXパワー820ml',
      price_total: 328,
      who_paid: 'both'
    },
    {
      name: 'サラヤ テイユコット100ムコち56',
      price_total: 280,
      who_paid: 'both'
    },
    {
      name: 'バナナ',
      price_total: 256,
      who_paid: 'both'
    },
    {
      name: 'ハウスバイング35g',
      price_total: 100,
      who_paid: 'both'
    },
    {
      name: 'トマト コツコ',
      price_total: 398,
      who_paid: 'both'
    },
    {
      name: 'タンノンビオカセイタクブドウ',
      price_total: 326,
      who_paid: 'both'
    },
    {
      name: 'タンノンビオ シチリアレモン 4コ',
      price_total: 163,
      who_paid: 'both'
    },
    {
      name: 'コイワイヨーグルトホンボウ400g',
      price_total: 199,
      who_paid: 'both'
    },
    {
      name: 'ミヤマ イチオシムキチ 200g',
      price_total: 153,
      who_paid: 'both'
    },
    {
      name: 'コウサンウオカトリムネニク',
      price_total: 596,
      who_paid: 'both'
    }
  ],
  receipt_total: 4626
})
// const receiptTotal = ref(0)
// TODO: Testing. When finished, comment out the line above
const receiptTotal = ref(4626)
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
// TODO: Is there a better way to write this?
type Steps = typeof STEP_1 | typeof STEP_2 | typeof STEP_3
// const currentStep = ref<Steps>(STEP_1)
// TODO: Testing. When finished, comment out the line above
const currentStep = ref<Steps>(STEP_2)

const handleOpenAddItemModal = () => {
  isOpenEditModal.value = true
  isOpenAddItemModal.value = true
}
const handleOpenEditTotalModal = () => {
  console.log('perry: dd')
  isEditTotalModelOpen.value = true
  fakeTotal.value = receiptTotal.value
}
const seeFinalResults = async () => {
  console.log('perry: seeFinalResults function: ', {
    receiptInfo: receiptInfo.value,
    receiptTotal: receiptTotal.value,
    perryTotal: Math.ceil(perryTotal.value + bothTotalSplitted.value),
    hannahTotal: Math.floor(hannahTotal.value + bothTotalSplitted.value),
    bothTotal: bothTotal.value
  })
  // const formData = new FormData()

  // if (!selectedFile.value) {
  //   console.error('No file selected')
  //   return
  // }
  // formData.append('image', selectedFile.value)
  // formData.append('title', receiptTitle.value)
  // formData.append('user_who_paid', userWhoPaid.value)
  // formData.append('total_amount', `${receiptTotal.value}`)
  // formData.append(
  //   'person_1_amount',
  //   `${Math.ceil(perryTotal.value + bothTotalSplitted.value)}`
  // )
  // formData.append(
  //   'person_2_amount',
  //   `${Math.floor(hannahTotal.value + bothTotalSplitted.value)}`
  // )
  // formData.append('bought_items', JSON.stringify(receiptInfo.value.items))

  // try {
  //   isLoading.value = true
  //   // TODO: maybe axios is better? Or using a composable?
  //   const response = await fetch('http://local.memories.com/api/receipt-info', {
  //     method: 'POST',
  //     body: formData
  //   })
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`)
  //   }
  //   const receiptInfoResponse: ReceiptInfoResponse = await response.json()
  //   receiptInfo.value = receiptInfoResponse.receipt_info
  //   receiptTotal.value = receiptInfoResponse.receipt_info.receipt_total
  //   currentStep.value = STEP_3
  // } catch (error) {
  //   console.error('Error analyzing receipt:', error)
  // } finally {
  //   isLoading.value = false
  // }
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
  isEditTotalModelOpen.value = false
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
const handleEditReceiptTotal = () => {
  console.log('perry: receiptTotal was: ', receiptTotal.value)
  console.log('perry: now it will be: ', fakeTotal.value)
  receiptTotal.value = fakeTotal.value
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
const moveToStepTwo = (payload: MoveToStepTwoPayload) => {
  currentStep.value = STEP_2
  if (payload.receiptInfo) {
    receiptTotal.value = payload.receiptInfo?.receipt_total
    receiptInfo.value.items = payload.receiptInfo.items.map(
      (receipt: ItemInfo) => {
        return {
          ...receipt,
          who_paid: USERS.BOTH.NAME
        }
      }
    )
    console.log('perry: receiptInfo.value: ', JSON.stringify(receiptInfo.value))
  }
}

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
    formattedPrice: formatPrice(receiptTotal.value)
  }
])
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
</script>
