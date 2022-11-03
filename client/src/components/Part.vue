<template>
  <div class="part">
  <div class="partcol">
    <Splide style="width: 480px; height: 300px;">
      <SplideSlide v-for="image in store.currentPart.photos">
        <img :src=image.url width="480" height="300" onclick="window.open(this.src)" class="fancypic">
      </SplideSlide>
    </Splide>
  </div>
  <div class="partcol">
  <p><span class="sectitle">Description:</span> {{ store.currentPart.description }}</p>
  <p><span class="sectitle">3DeRox Part Number:</span> {{ store.currentPart.deroxNum }}</p>
  <p><span class="sectitle">Manufacturer Part Number:</span> {{ store.currentPart.manNum }}</p>
  <p><span class="sectitle">Price:</span> {{ formatPrice(store.currentPart.price) }}</p>
  <p><span class="sectitle">Required Per Car:</span> {{ store.currentPart.reqQty }}</p>
  <p><span class="sectitle">In Stock:</span> {{ store.currentPart.inStock }}</p>
  </div>
  </div>
  <div class="part">
  <div class="partcol">
  <p>{{ store.currentPart.blurb }}</p>
  <p><span class="sectitle">Materials:</span> <ul> <li v-for="mat in store.currentPart.material" class="horilist">{{ mat }}</li> </ul></p>
  <p><span class="sectitle">Colors:</span> <ul> <li v-for="col in store.currentPart.colors" class="horilist"><span class="colblock" :style="{ background: col }"></span>{{ col }}</li> </ul></p>
  <p><span class="sectitle">Supported Makes:</span> <ul> <li v-for="mak in store.currentPart.makes" class="horilist">{{ mak }}</li> </ul></p>
  <p><span class="sectitle">Supported Models:</span><ul> <li v-for="mod in store.currentPart.models" class="horilist">{{ mod }}</li> </ul></p>
  <p><span class="sectitle">Supported Years:</span><ul> <li v-for="yea in store.currentPart.years" class="horilist">{{ yea }}</li> </ul></p>
  <p><span class="sectitle">Additional Files:</span> <ul> <li v-for="file in store.currentPart.addFiles"><a :href=file.url target="_blank">{{ file.desc }}</a></li></ul></p>
  <p class="storeHead"><h3>Also Available in these Places</h3></p>
  <div class="storefront">
  <div v-for="storef in store.currentPart.storefronts">
  <div v-if="storef == 'eBay'"><a href="http://https://www.ebay.com/usr/md3derox">3DEROX on eBay</a></div>
  <div v-else-if="storef == 'Amazon'"><a href="https://www.amazon.com">Amazon</a></div>
  <div v-else-if="storef == 'Etsy'"><a href="https://www.etsy.com/shop/3DeRox">3DEROX on Etsy</a></div>
  <div v-else-if="storef == 'Facebook'"><a href="https://www.facebook.com/3derox">3DEROX on Facebook</a></div>
  </div>
  </div>
  </div>
  </div>
</template>

<style scoped>
.colblock {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid black;
  margin-right: 10px;
}
.fancypic {
  border-radius: 8px;
}
.horilist {
  display: inline;
  padding-right: 40px;
}
.sectitle {
  font-weight: bold;
}
.storeHead {
  text-align: center;
}
.part {
  display: flex;
  min-height: 10vh;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  width: 1000px;
  gap: 10px;
}
.partcol {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-width: 400px;
}
.storefront {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>

<script>
import { usePartStore } from '@/stores/partsStore.js'
import '@splidejs/vue-splide/css'

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
  },
}
</script>
