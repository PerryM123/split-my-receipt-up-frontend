<template>
  This is receipt details page (id: {{ receiptId }})
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const receiptId = route.params.receipt_id
</script>