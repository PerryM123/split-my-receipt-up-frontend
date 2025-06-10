<template>
  <div>
    <PageTitle>Split Me Up Before You Go-Go</PageTitle>
    <div class="mt-16">
      <NuxtLink
        v-for="(link, linkKey) in linkInfo"
        :key="linkKey"
        :to="link.url"
        class="mt-5 block rounded border border-solid border-black bg-gray-300 px-5 py-5 text-center transition-all duration-700 first:mt-0 hover:opacity-30"
      >
        {{ link.linkText }}
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
import PageTitle from '@/components/atoms/PageTitle.vue'

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
useHead({
  title: 'Home Page'
})
</script>
