<template>
  <div
    class="flex items-center justify-between border-b border-t border-gray-400 px-1 py-2"
  >
    <p>{{ receiptCount }}件</p>
    <div>
      <label for="order-select">Sort by:</label>
      <select
        id="order-select"
        name="receipt-display-order"
        class="ml-2 rounded border border-gray-400 p-1"
        @change="changeReceiptOrder"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ReceiptDisplayOrder } from '@/types/receipt'

defineProps<{
  receiptCount: number
}>()
const emit = defineEmits<{
  'order-changed': [ReceiptDisplayOrder]
}>()

const changeReceiptOrder = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement
  emit('order-changed', selectElement.value as ReceiptDisplayOrder)
}
</script>
