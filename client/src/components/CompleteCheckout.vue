<template>
    <div class="inCart">
        <div class="detailCol">
                <router-link v-if="!cartProduct.isShip" class="link link-hover" :to="`/product/${cartProduct.id}`">{{ cartProduct.title }}</router-link>
                <p v-else>Shipping: {{ cartProduct.id }}</p>
            <p>x {{ cartProduct.quantity }} @ {{ toCurrency(cartProduct.indCost) }} each</p>
            <p class="custom">{{cartProduct.custom}}</p>
        </div>
    </div>
</template>

<style scoped>
.custom {
  font-size: 10px;
}
.detailCol {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}
.inCart {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  align-content: flex-start;
}
.sectitle {
  font-weight: bold;
}
.divider {
  border: 1px solid #1A1A1A;
  border-radius: 1px;
  width: 75%;
}
</style>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';
import type { CartPreview } from '../stores/cartStore'
import { toCurrency } from '../util'
const cartStore = useCartStore()
defineProps<{
    cartProduct: CartPreview
}>();
</script>
