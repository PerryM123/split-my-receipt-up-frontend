<template>
  <table v-if="boughtItems?.length">
    <tbody>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      <!-- TODO: 以下は仮です -->
      <tr
        v-for="(perryBoughtItem, perryReceiptKey) in boughtItems"
        :key="perryReceiptKey"
      >
        <td>{{ perryBoughtItem.name }}</td>
        <td>{{ formatPrice(perryBoughtItem.price) }}</td>
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
