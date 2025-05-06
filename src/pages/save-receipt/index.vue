<template>
  <div>
    <img v-if="isLoading" src="/loading.gif" alt="Analyzing Receipt" />
    <template v-else>
      <h2>レシート保存</h2>
      <fieldset>
        <legend>Who paid?</legend>
        <div>
          <input
            id="perry"
            type="radio"
            name="who-paid"
            value="perry"
            checked
          />
          <label for="perry">Perry</label>
        </div>
        <div>
          <input id="hannah" type="radio" name="who-paid" value="hannah" />
          <label for="hannah">Hannah</label>
        </div>
      </fieldset>
      <div>
        <h2>Receipt Photo</h2>
        <input type="file" accept=".jpg,.jpeg" @change="previewImage" />
        <img v-if="imageSrc" :src="imageSrc" alt="Selected Receipt" />
        <p v-else>no image...</p>
        <button :disabled="!selectedFile" @click="analyzeReceipt">分析</button>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
const imageSrc = ref('')
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)

const previewImage = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) {
    return
  }
  imageSrc.value = URL.createObjectURL(file)
  selectedFile.value = file
}

const analyzeReceipt = async () => {
  if (!selectedFile.value) {
    console.error('No file selected')
    return
  }
  const formData = new FormData()
  formData.append('image', selectedFile.value)
  try {
    isLoading.value = true
    // TODO: maybe axios is better? Or using a composable?
    const response = await fetch('http://local.memories.com/api/receipt-info', {
      method: 'POST',
      body: formData
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    console.log('perry: Analysis result:', result)
  } catch (error) {
    console.error('Error analyzing receipt:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
