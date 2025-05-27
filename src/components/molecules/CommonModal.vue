<!-- 
TODO:
- replace scss with tailwindcss classes
-->
<template>
  <div v-if="props.isModalOpen" class="modal">
    <div class="blackModal" @click="handleClickBlackOverlay"></div>
    <div class="modalBox">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['handle-click-black-overlay'])
const handleClickBlackOverlay = () => {
  emit('handle-click-black-overlay')
}
</script>
<style lang="scss" scoped>
.modalBox {
  position: fixed;
  background: white;
  width: 85%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  z-index: 200;
  max-height: 100vh;
  padding: 20px;

  .modalTitle {
    text-align: center;
    margin: 0;
  }
}

.blackModal {
  height: 100vh;
  background: black;
  width: 100%;
  position: fixed;
  z-index: 100;
  opacity: 0.7;
  top: 0;
  left: 0;
}
</style>
