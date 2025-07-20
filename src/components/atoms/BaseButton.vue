<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    :class="
      twMerge([
        buttonClass.normal,
        buttonClass.dynamic,
        buttonClass.small,
        props.class
      ])
    "
  >
    <slot></slot>
  </NuxtLink>
  <button
    v-else
    type="button"
    :class="
      twMerge([
        buttonClass.normal,
        buttonClass.dynamic,
        buttonClass.small,
        props.class
      ])
    "
  >
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'

const props = withDefaults(
  defineProps<{
    to?: string
    primary?: boolean
    secondary?: boolean
    small?: boolean
    class?: string
  }>(),
  {
    primary: true,
    secondary: false,
    small: false,
    string: ''
  }
)

const buttonClass = {
  normal:
    'w-full block rounded-xl text-lg font-medium transition inline-block text-center',
  dynamic: props.secondary
    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    : 'bg-teal-500 text-white hover:bg-teal-600',
  small: props.small ? 'py-1' : 'py-3'
}
</script>
