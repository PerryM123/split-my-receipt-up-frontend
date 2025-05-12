<template>
  <button class="button" @click="props.onClick"><slot></slot></button>
</template>
<script lang="ts" setup>
const props = defineProps({
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.button {
  padding: 10px 24px;
  font-weight: 800;
  background: #fc6e51;
  background: #18a79a;
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.08rem;
  border: none;
  transition: 0.5s opacity ease-in-out;
  &--secondary {
    background: #fff;
    border: solid 2px #18a79a;
    color: #18a79a;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
