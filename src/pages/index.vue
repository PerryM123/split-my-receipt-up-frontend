<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="mx-5 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
    >
      <PageTitle class="mb-6"> Split My Receipt Up </PageTitle>
      <BaseButton
        v-for="(link, linkKey) in linkInfo"
        :key="linkKey"
        class="mb-4"
        :to="link.url"
        :secondary="link.secondary"
      >
        {{ link.linkText }}
      </BaseButton>
    </div>
  </div>
</template>
<script setup>
import PageTitle from '@/components/atoms/PageTitle.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const linkInfo = ref([
  {
    linkText: '新規レシート作成',
    url: '/save-receipt'
  },
  {
    linkText: 'レシート一覧',
    url: '/receipts',
    secondary: true
  }
])
useHead({
  title: 'Home Page'
})
</script>
