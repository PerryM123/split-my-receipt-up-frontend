<template>
  <div>
    <h1>Split Me Up Before You Go-Go</h1>
    <div class="px-2.5">
      <NuxtLink
        v-for="link in linkInfo"
        :key="link.url"
        :to="link.url"
        class="block bg-sky-500 hover:bg-sky-700"
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
