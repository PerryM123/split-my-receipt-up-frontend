<template>
  <h1 class="text-center text-3xl font-bold leading-tight"><slot></slot></h1>
</template>

<script setup lang="ts">
import type { BoughtItem } from '@/interfaces/receipt'

defineProps<{ boughtItems?: BoughtItem[] }>()
</script>
