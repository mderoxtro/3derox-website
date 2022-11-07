<template>
<div class="parts">
  <h1>Parts</h1>
    <div class="container">
    <div v-for="item in store.allParts" class="partbox" part="item">
    <img :src=item.photos[0].url width="235" height="150" class="fancypic">
    <p><span class="sectitle">3DeRox #:</span> {{ item.deroxNum }}</p>
    <p><span class="sectitle">Manufacturer #:</span> {{ item.manNum }}</p>
    <p><span class="sectitle">Description:</span> {{ item.description }}</p>
    <p><span class="sectitle">Price:</span> {{ formatPrice(item.price) }}</p>
    <router-link :to="`/product/${item.deroxNum}`" tag="button" @click=store.setPart(item)>View More Details</router-link>
    </div>
    </div>
</div>
</template>

<style scoped>
  .sectitle {
    font-weight: bold;
  }
  .fancypic {
    border-radius: 8px;
  }
  .parts {
    min-height: 50vh;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    gap: 5px;
    flex-direction: column;
  }
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  .partbox {
    display: flex;
    flex-direction: column;
    max-width: 240px;
    min-width: 240px;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
</style>

<script>
import { usePartStore } from '@/stores/partsStore.js'

export default {
  setup() {
    const store = usePartStore()
    
    return {
      store
    }
  },
  methods: {
    formatPrice(value) {
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
      return formatter.format(value)
    }
  }
}

</script>
