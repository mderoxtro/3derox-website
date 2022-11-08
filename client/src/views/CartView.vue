<template>
<div class="cart">
    <div v-if="!productStore.loaded" class="space-y-4">

    </div>
    <div v-else-if="!formattedCart.length">
      <h1 class="text-xl">Cart is empty.</h1>
    </div>
    <div v-else class="cartData">
    <div class="cartDataItem">
      <CartCard
        v-for="(cartProduct, index) in formattedCart"
        :key="index"
        :cartProduct="cartProduct"
      />
    </div>
      <div class="total">
        <p class="tote"><span class="sectitle">Cart Total:</span> {{ toCurrency(cartStore.total) }}</p>
        <p v-if="cartStore.total > 25" class="tote"><span class="sectitle">Free Shipping!</span></p>
        <p v-else class="tote"><span class="sectitle">+ Shipping Cost</span></p>
        <button class="fancyButton">Checkout</button>
        <button @click="cartStore.removeAll" class="fancyButton">Empty Cart</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  min-height: 50vh;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  gap: 5px;
}
.sectitle {
  font-weight: bold;
}
.cartData {
  display: flex;
}
.cartDataItem {
  display: flex;
  flex-direction: column;
}
.total {
  display: flex;
  margin-left: 100px;
  margin-top: 10px;
  min-width: 200px;
  flex-direction: column;
}
.tote {
  text-align: right;
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
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
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
import { computed } from 'vue';
import CartCard from '../components/Cart.vue';
import { toCurrency } from '../util';
import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';
const cartStore = useCartStore();
const productStore = useProductStore();
const formattedCart = computed(() => cartStore.formattedCart);
</script>
