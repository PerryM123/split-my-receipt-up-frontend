<template>
  <div>
    <NuxtLoadingIndicator :height="10" :throttle="0" />
    <!-- TODO: Use NuxtTemplate -->
    <div class="p-5">
      <NuxtPage />
    </div>
  </div>
</template>
<script setup lang="ts">
const { start, set } = useLoadingIndicator()
start({ force: true })
</script>
