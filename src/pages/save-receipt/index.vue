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
      <!-- TODO: 動作確認が終わり次第以下の要素を削除 -->
      <div class="debug-mode">
        <p>=========</p>
        <p>receiptInfo: {{ receiptInfo }}</p>
        <p>receiptTotal: {{ receiptTotal }}</p>
        <p>whoPaidForTheItem: {{ whoPaidForTheItem }}</p>
        <p>perryCount: {{ perryCount }}</p>
        <p>hannahCount: {{ hannahCount }}</p>
        <p>bothCount: {{ bothCount }}</p>
        <p>perry = {{ perryTotal }}</p>
        <p>hannah = {{ hannahTotal }}</p>
        <p>
          perry + hannah = {{ perryTotal + hannahTotal }} (メモ: tax and other
          must be 256 then?? So receiptTotal - perryTotal - hannahTotal is the
          tax?)
        </p>
        <p>bothTotal = {{ receiptTotal - (perryTotal + hannahTotal) }}</p>
        <p>=========</p>
      </div>
      <div>
        <ul>
          <li>Perry: {{ formatPrice(perryTotal) }}</li>
          <li>Hannah: {{ formatPrice(hannahTotal) }}</li>
          <li>Total: {{ formatPrice(receiptTotal) }}</li>
        </ul>
        <div>
          <button @click="addScannedItem">Add Item</button>
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
                  v-model="whoPaidForTheItem[itemIndex]"
                  type="radio"
                  :name="`who-paid-${itemIndex}`"
                  :value="`perry`"
                />
                <label :for="`perry-${itemIndex}`">P</label>
                <input
                  :id="`hannah-${itemIndex}`"
                  v-model="whoPaidForTheItem[itemIndex]"
                  type="radio"
                  :name="`who-paid-${itemIndex}`"
                  :value="`hannah`"
                />
                <label :for="`hannah-${itemIndex}`">H</label>
                <input
                  :id="`both-${itemIndex}`"
                  v-model="whoPaidForTheItem[itemIndex]"
                  type="radio"
                  :name="`who-paid-${itemIndex}`"
                  :value="`both`"
                  checked
                />
                <label :for="`both-${itemIndex}`">両方</label>
              </td>
              <td>
                <button
                  :data-index="itemIndex"
                  :data-user-type="item.name"
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
import { USERS } from '~/constants'
import type { ItemData, ShoppingData } from '~/interfaces/shopping'

// TODO: Instead of interface, is it better to change to type instead???
interface ReceiptInfo {
  items: ItemInfo[]
  receipt_total: number
}
interface ItemInfo {
  name: string
  price_total: number
  whoPaid?: string
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
// const receiptInfo = ref<ReceiptInfo>()
// TODO:
const receiptInfo = ref<ReceiptInfo>({
  items: [
    {
      name: 'ハーゲンミニCロウチャクリキーウカ',
      price_total: 218,
      whoPaid: 'both'
    },
    {
      name: 'オリジナルスフラッドオレンジ',
      price_total: 204,
      whoPaid: 'both'
    },
    {
      name: 'オカメ スコイサットS-903',
      price_total: 264,
      whoPaid: 'both'
    },
    {
      name: 'アタックウオシEXヘヤカカ850g',
      price_total: 308,
      whoPaid: 'both'
    },
    {
      name: 'コウサンウオトンジヤ玉150×3',
      price_total: 78,
      whoPaid: 'both'
    },
    {
      name: 'セブンスターリサンゴールド',
      price_total: 499,
      whoPaid: 'both'
    },
    {
      name: 'ワイドハイターEXパワー820ml',
      price_total: 328,
      whoPaid: 'both'
    },
    {
      name: 'サラヤ テイユコット100ムコち56',
      price_total: 280,
      whoPaid: 'both'
    },
    {
      name: 'バナナ',
      price_total: 256,
      whoPaid: 'both'
    },
    {
      name: 'ハウスバイング35g',
      price_total: 100,
      whoPaid: 'both'
    },
    {
      name: 'トマト コツコ',
      price_total: 398,
      whoPaid: 'both'
    },
    {
      name: 'タンノンビオカセイタクブドウ',
      price_total: 326,
      whoPaid: 'both'
    },
    {
      name: 'タンノンビオ シチリアレモン 4コ',
      price_total: 163,
      whoPaid: 'both'
    },
    {
      name: 'コイワイヨーグルトホンボウ400g',
      price_total: 199,
      whoPaid: 'both'
    },
    {
      name: 'ミヤマ イチオシムキチ 200g',
      price_total: 153,
      whoPaid: 'both'
    },
    {
      name: 'コウサンウオカトリムネニク',
      price_total: 596,
      whoPaid: 'both'
    }
  ],
  receipt_total: 4626
})
// const receiptTotal = ref(0)
// TODO: 動作確認が終わり次第、上記をコメントアウトし、元に戻す
const receiptTotal = ref(4626)
// TODO: perryTotal & hannahTotal have nearlyy the same logic. Need to make more DRY
const perryTotal = computed(() => {
  return receiptInfo.value.items.reduce((total, item, index) => {
    if (whoPaidForTheItem.value[index] === 'perry') {
      return total + item.price_total
    } else if (whoPaidForTheItem.value[index] === 'both') {
      return total + item.price_total / 2
    }
    return total
  }, 0)
})
const hannahTotal = computed(() => {
  return receiptInfo.value.items.reduce((total, item, index) => {
    if (whoPaidForTheItem.value[index] === 'hannah') {
      return total + item.price_total
    } else if (whoPaidForTheItem.value[index] === 'both') {
      return total + item.price_total / 2
    }
    return total
  }, 0)
})
// const whoPaidForTheItem = ref<string[]>([])
// TODO: 動作確認が終わり次第、上記をコメントアウトし、元に戻す
const whoPaidForTheItem = ref<string[]>([
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both',
  'both'
])
const perryCount = computed(
  // TODO: magic stringの代わりにちゃんと変数に変更
  () => whoPaidForTheItem.value.filter((item) => item === 'perry').length
)
const hannahCount = computed(
  // TODO: magic stringの代わりにちゃんと変数に変更
  () => whoPaidForTheItem.value.filter((item) => item === 'hannah').length
)
const bothCount = computed(
  // TODO: magic stringの代わりにちゃんと変数に変更
  () => whoPaidForTheItem.value.filter((item) => item === 'both').length
)

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
    whoPaidForTheItem.value = receiptInfoResponse.receipt_info.items.map(
      () => 'both'
    )
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
// TODO: any変数型
const handleOpenEditModal = (event: MouseEvent, data) => {
  console.log('perry: handleOpenEditModal function: ', {
    event,
    data
  })
}
</script>
