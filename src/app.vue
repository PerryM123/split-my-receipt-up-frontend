<template>
  <div>
    <ClientOnly>
      <NuxtLoadingIndicator :height="10" :throttle="0" />
    </ClientOnly>
    <!-- TODO: Use NuxtTemplate -->
    <div class="p-5">
      <NuxtPage />
    </div>
  </div>
</template>
<script setup lang="ts">
const { start } = useLoadingIndicator()
start({ force: true })
</script>
