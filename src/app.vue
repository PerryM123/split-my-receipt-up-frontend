<template>
  <div>
    <ClientOnly>
      <NuxtLoadingIndicator :height="10" :throttle="0" />
    </ClientOnly>
    <div class="h-full min-h-screen bg-gray-100">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
<script setup lang="ts">
const { start } = useLoadingIndicator()
start({ force: true })
</script>
