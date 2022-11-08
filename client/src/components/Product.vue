<template>
    <div class="part">
    <div class="partcol">
      <Splide style="width: 480px; height: 300px;">
        <SplideSlide v-for="image in product.photos">
          <img :src=image.url width="480" height="300" onclick="window.open(this.src)" class="fancypic">
        </SplideSlide>
      </Splide>
    </div>
    <div class="partcol">
    <p><span class="sectitle">Description:</span> {{ product.description }}</p>
    <p><span class="sectitle">3DeRox Part Number:</span> {{ product.deroxNum }}</p>
    <p><span class="sectitle">Manufacturer Part Number:</span> {{ product.manNum }}</p>
    <p><span class="sectitle">Price:</span> {{ toCurrency(product.price) }}</p>
    <p><span class="sectitle">Required Per Car:</span> {{ product.reqQty }}</p>
    <p><span class="sectitle">In Stock:</span> {{ product.inStock }}</p>
    </div>
    </div>
    <div class="part">
    <div class="partcol">
    <p>{{ product.blurb }}</p>
    <p><span class="sectitle">Materials:</span> <ul> <li v-for="mat in product.material" class="horilist">{{ mat }}</li> </ul></p>
    <p><span class="sectitle">Colors:</span> <ul> <li v-for="col in product.colors" class="horilist"><span class="colblock" :style="{ background: col }"></span>{{ col }}</li> </ul></p>
    <p><span class="sectitle">Supported Makes:</span> <ul> <li v-for="mak in product.makes" class="horilist">{{ mak }}</li> </ul></p>
    <p><span class="sectitle">Supported Models:</span><ul> <li v-for="mod in product.models" class="horilist">{{ mod }}</li> </ul></p>
    <p><span class="sectitle">Supported Years:</span><ul> <li v-for="yea in product.years" class="horilist">{{ yea }}</li> </ul></p>
    <p><span class="sectitle">Additional Files:</span> <ul> <li v-for="file in product.addFiles"><a :href=file.url target="_blank">{{ file.desc }}</a></li></ul></p>
    <div v-if="product.condFlags[0] !== 'None'">
      <h3>Customization Options</h3>
      <div v-for="cond in product.condFlags">
      <p v-if="cond === 'Color'"><span class="sectitle">Select Color</span> <select v-model="colorSelected"><option v-for="col in product.colors" :value="col">{{col}}</option></select></p>
      <p v-if="cond === 'Design'"><span class="sectitle">Select Design</span> <select v-model="designSelected"><option v-for="mod in product.models" :value="mod">{{mod}}</option></select></p>
      <p v-if="cond === 'Dimension'"><span class="sectitle">Enter Required Dimension</span> <input v-model="dimension" placeholder="specify mm or inch" @change="inputDim"></p>
      </div>
      <button class="fancyButton" @click="cartStore.addComplex(product.deroxNum, colorSelected, designSelected, dimension)">
        Add to Cart
      </button>
    </div>
    <div v-else>
    <button class="fancyButton" @click="cartStore.add(product.deroxNum)">
      Add to Cart
    </button>
    </div>

    <p class="storeHead"><h3>Also Available in these Places</h3></p>
    <div class="storefront">
    <div v-for="storef in product.storefronts">
    <div v-if="storef == 'eBay'"><a href="https://www.ebay.com/usr/md3derox">3DEROX on eBay</a></div>
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
.fancyButton {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
}

.fancyButton:disabled {
  pointer-events: none;
}

.fancyButton:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.fancyButton:active {
  box-shadow: none;
  transform: translateY(0);
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';
import { toCurrency } from '../util'
import type { Product } from '../stores/productStore';
//import { usePartStore } from '@/stores/partsStore.js'
import '@splidejs/vue-splide/css'

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const colorSelect = ref('colorSelected')
const colorSelected = colorSelect.value
const designSelect = ref('designSelected')
const designSelected = designSelect.value
const dimension = ref('')

function inputDim(e, v = e.target.value){
  dimension.value = v
}

const product = computed<Product>(
  () => productStore.items[route.params.productId as string]
);
</script>
