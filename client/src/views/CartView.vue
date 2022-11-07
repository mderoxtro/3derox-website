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
        <button>Checkout</button>
        <button @click="cartStore.removeAll">Empty Cart</button>
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
