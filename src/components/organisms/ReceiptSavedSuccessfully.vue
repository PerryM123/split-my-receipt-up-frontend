<template>
  <div>
    <div class="flex items-center justify-center">
      <div
        class="mx-5 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
      >
        <div class="flex justify-center">
          <svg
            id="Layer_1"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="80px"
            viewBox="0 0 96 96"
            enable-background="new 0 0 96 96"
            xml:space="preserve"
          >
            <g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="#6BBE66"
                d="M48,0c26.51,0,48,21.49,48,48S74.51,96,48,96S0,74.51,0,48 S21.49,0,48,0L48,0z M26.764,49.277c0.644-3.734,4.906-5.813,8.269-3.79c0.305,0.182,0.596,0.398,0.867,0.646l0.026,0.025 c1.509,1.446,3.2,2.951,4.876,4.443l1.438,1.291l17.063-17.898c1.019-1.067,1.764-1.757,3.293-2.101 c5.235-1.155,8.916,5.244,5.206,9.155L46.536,63.366c-2.003,2.137-5.583,2.332-7.736,0.291c-1.234-1.146-2.576-2.312-3.933-3.489 c-2.35-2.042-4.747-4.125-6.701-6.187C26.993,52.809,26.487,50.89,26.764,49.277L26.764,49.277z"
              />
            </g>
          </svg>
        </div>
        <p class="mt-4 text-2xl font-bold">
          {{ receiptTitle }} Was Saved Successfully
        </p>
        <div class="mt-2">
          <BaseButton
            v-for="(button, buttonKey) in buttonDetails"
            :key="buttonKey"
            class="mt-4"
            :to="button.url"
          >
            {{ button.linkText }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'

const props = defineProps<{
  receiptTitle: string
  receiptId?: number
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
