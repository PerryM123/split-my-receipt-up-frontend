<template>
  <div
    class="flex items-center justify-between border-b border-t border-gray-400 px-1 py-2"
  >
    <p>
      {{ receiptCount }}件{{
        minDisplayCount && maxDisplayCount
          ? `中 ${minDisplayCount}-${maxDisplayCount}件`
          : ''
      }}
    </p>
    <div>
      <DropDownMenu
        :label="'Sort by:'"
        :options="['Newest', 'Oldest']"
        @update-selected-option="changeReceiptOrder"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ReceiptDisplayOrder } from '@/types/receipt'
import DropDownMenu from '@/components/atoms/DropDownMenu.vue'

defineProps<{
  receiptCount: number
  minDisplayCount?: number
  maxDisplayCount?: number
}>()
const emit = defineEmits<{
  'order-changed': [ReceiptDisplayOrder]
}>()

const changeReceiptOrder = (updatedOption: ReceiptDisplayOrder) => {
  emit('order-changed', updatedOption)
}
</script>
