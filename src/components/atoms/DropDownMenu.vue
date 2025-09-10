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
defineProps<{
  label: string
  options: string[]
}>()
const emit = defineEmits<{
  'update-selected-option': [string]
}>()

const changeOption = (event: Event) => {
  console.log('perry: changeOption: changeOption: ', event)
  const selectElement = event.target as HTMLSelectElement
  emit('update-selected-option', selectElement.value)
}
</script>
