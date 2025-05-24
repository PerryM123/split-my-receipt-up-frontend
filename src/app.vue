<template>
  <div>
    <!-- TODO: Use NuxtTemplate -->
    <NuxtLoadingIndicator :height="10" :throttle="0"/>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
const { start, set } = useLoadingIndicator()
start({ force: true })
</script>
