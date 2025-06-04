<template>
  <table v-if="boughtItems?.length" class="mt-2 w-full">
    <tbody>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Price</th>
      </tr>
      <tr
        v-for="(perryBoughtItem, perryReceiptKey) in boughtItems"
        :key="perryReceiptKey"
        class="border-solid border-black [&:not(:last-child)]:border-b"
      >
        <td>{{ perryBoughtItem.name }}</td>
        <td class="text-right">{{ formatPrice(perryBoughtItem.price) }}</td>
      </tr>
    </tbody>
  </table>
  <div v-else>
    <p>No items bought</p>
  </div>
</template>

<script setup lang="ts">
import type { BoughtItem } from '@/interfaces/receipt'

defineProps<{ boughtItems?: BoughtItem[] }>()
</script>
