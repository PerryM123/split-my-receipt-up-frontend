<template>
  <label for="order-select">{{ label }}</label>
  <select
    id="order-select"
    name="receipt-display-order"
    class="ml-2 rounded border border-gray-400 p-1"
    @change="changeOption"
  >
    <option
      v-for="(optionLabel, optionIndex) in options"
      :key="optionIndex"
      :value="optionLabel.toLowerCase()"
    >
      {{ optionLabel }}
    </option>
  </select>
</template>
<script lang="ts" setup>
import type { ReceiptDisplayOrder } from '@/types/receipt'

defineProps<{
  label: string
  options: string[]
}>()
const emit = defineEmits<{
  'update-selected-option': [ReceiptDisplayOrder]
}>()

const changeOption = (event: Event) => {
  console.log('perry: changeOption: changeOption: ', event)
  const selectElement = event.target as HTMLSelectElement
  emit('update-selected-option', selectElement.value as ReceiptDisplayOrder)
}
</script>
