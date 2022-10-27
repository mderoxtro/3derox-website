<template>
<div class="parts">
  <h1>Parts</h1>
    <div class="container">
    <div v-for="item in state" class="partbox" part="item">
    <p>PHOTO</p>
    <p>3DeRox #: {{ item.deroxNum }}</p>
    <p>Manufacturer #: {{ item.manNum }}</p>
    <p>Description: {{ item.description }}</p>
    <p>Materials: <li v-for="mat in item.material">{{ mat }}</li></p>
    <p>Colors: <li v-for="col in item.colors">{{ col }}</li></p>
    <p>Makes: <li v-for="mak in item.makes">{{ mak }}</li></p>
    <p>Models: <li v-for="mod in item.models">{{ mod }}</li></p>
    <p>Years: <li v-for="yea in item.years">{{ yea }}</li></p>
    <p>Required Quantity: {{ item.reqQty }}</p>
    <p>Price: $ {{ item.price }}</p>
    <p>Storefronts: <li v-for="store in item.storefronts">{{ store }}</li></p>
    <p>Additional Files: {{ item.addFiles }}</p>
    <button @click='viewPart()'>View Part Details</button>
    </div>
    </div>
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
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .partbox {
    display: flex;
    flex-direction: column;
    min-width: 200px;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
</style>

<script>
  import { ref } from 'vue'
  
  export default {
    props: {
      part: Object
    },
    methods: {
      viewPart() {
        this.$emit('passPart')
      }
    },
    setup() {
      const state = ref({})
      
      fetch('http://localhost:3000/allParts')
        .then(response => response.json())
        .then(data => state.value = data)
      
      return { state }
    }
  }
</script>
