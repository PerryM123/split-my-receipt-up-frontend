<template>
  <h1 class="text-3xl"><slot></slot></h1>
</template>

<script setup lang="ts">
import type { BoughtItem } from '@/interfaces/receipt'

defineProps<{ boughtItems?: BoughtItem[] }>()
</script>
