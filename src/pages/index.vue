<template>
  <div class="p-5">
    <h1 class="text-3xl">Split Me Up Before You Go-Go</h1>
    <div class="mt-16">
      <!-- TODO: There must be a way to order the tailwind classes with an extension and preitter
       -->
       <!-- TODO: Should we make this into an atom component? -->
      <NuxtLink
        v-for="(link, linkKey) in linkInfo"
        :key="linkKey"
        :to="link.url"
        class="py-5 px-5 first:mt-0 mt-5 text-center border-black border border-solid rounded block bg-gray-300 hover:opacity-30 transition-all duration-700"
      >
        {{ link.linkText }}
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const linkInfo = ref([
  {
    linkText: '新規レシート作成',
    url: '/save-receipt'
  },
  {
    linkText: 'レシート一覧',
    url: '/receipts'
  }
])
</script>
