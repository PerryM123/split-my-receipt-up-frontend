<template>
  <div>
    <h2>Receipt Saved</h2>
    <p>{{ receiptTitle }} was successfully saved</p>
    <!-- TODO: Make it DRY! -->

    <div
      v-for="(button, buttonKey) in buttonDetails"
      :key="buttonKey"
      class="mt-16"
    >
      <NuxtLink
        class="mt-5 block rounded border border-solid border-black bg-gray-300 px-5 py-5 text-center transition-all duration-700 first:mt-0 hover:opacity-30"
        :to="button.url"
      >
        {{ button.linkText }}
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  receiptTitle: string
  receiptId: number
}>()

const buttonDetails = computed(() => [
  {
    linkText: 'See The Receipt Details',
    url: `/receipts/${props.receiptId}`
  },
  {
    linkText: 'Home Page',
    url: '/'
  }
])
</script>
