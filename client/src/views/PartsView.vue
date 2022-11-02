<template>
<div class="parts">
  <h1>Parts</h1>
    <div class="container">
    <div v-for="item in store.allParts" class="partbox" part="item">
    <p>PHOTO</p>
    <p>3DeRox #: {{ item.deroxNum }}</p>
    <p>Manufacturer #: {{ item.manNum }}</p>
    <p>Description: {{ item.description }}</p>
    <p>Price: {{ formatPrice(item.price) }}</p>
    <router-link :to="{ name: 'part_detail' }" tag="button" @click=store.setPart(item)>View More Details</router-link>
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
