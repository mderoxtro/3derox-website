<template>
<div class="parts">
  <h1>Parts</h1>
    <div>{{ state }}</div>
    <p>Parts Go Here</p>
</div>
</template>

<style scoped>
  .parts {
    min-height: 100vh;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    gap: 10px;
    flex-direction: column;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
</style>

<script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const state = ref({})
      
      fetch('http://localhost:3000/allParts')
        .then(response => response.json())
        .then(data => state.value = data)
      
      return { state }
    }
  }
</script>
