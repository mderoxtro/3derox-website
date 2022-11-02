<template>
  <div class="part">
  <div class="partcol">
  <p>PHOTO GALLERY HERE</p>
  </div>
  <div class="partcol">
  <p>Description: {{ store.currentPart.description }}</p>
  <p>3DeRox Part Number: {{ store.currentPart.deroxNum }}</p>
  <p>Manufacturer Part Number: {{ store.currentPart.manNum }}</p>
  <p>Price: {{ formatPrice(store.currentPart.price) }}</p>
  <p>Required Per Car: {{ store.currentPart.reqQty }}</p>
  </div>
  </div>
  <div class="part">
  <div class="partcol">
  <p>A descriptive blurb should go here.  So much text.  This is me just trying to write several paragraphs of useless information.  Nice weather we're having, eh?  It's hot as fuck in Florida all the time.  There once was a lad from Nantucket.  A potato a day keeps the Irish away.</p>
  <p>Materials: {{ store.currentPart.material }}</p>
  <p>Colors: {{ store.currentPart.colors }}</p>
  <p>Supported Makes: {{ store.currentPart.makes }}</p>
  <p>Supported Models: {{ store.currentPart.models }}</p>
  <p>Supported Years: {{ store.currentPart.years }}</p>
  <p>Additional Files: {{ store.currentPart.addFiles }}</p>
  <p>Also Available in these Places</p>
  <p>{{ store.currentPart.storefronts }}</p>
  </div>
  </div>
</template>

<style scoped>
.part {
  display: flex;
  min-height: 10vh;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  gap: 10px;
}
.partcol {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
