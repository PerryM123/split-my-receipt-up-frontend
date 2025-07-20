<template>
  <NuxtLink
    :to="props.to"
    class="mb-4 block w-full rounded-xl py-3 text-lg font-medium transition"
    :class="[
      props.secondary
        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        : 'bg-teal-500 text-white hover:bg-teal-600'
    ]"
  >
    <slot></slot>
  </NuxtLink>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    to: string
    primary?: boolean
    secondary?: boolean
  }>(),
  {
    primary: true,
    secondary: false
  }
)
</script>
