<template>
    <div class="inCart">
        <div class="card-body">
            <h3 class="card-title">
                <router-link class="link link-hover" :to="`/product/${cartProduct.id}`">{{ cartProduct.title }}</router-link>
            </h3>
            <p class="custom">{{cartProduct.custom}}</p>
            <p>x {{ cartProduct.quantity }} @ {{ toCurrency(cartProduct.indCost) }} each</p>
        </div>
    </div>
</template>

<style scoped>
.custom {
  font-size: 10px;
}
.fancypic {
  border-radius: 8px;
}
.inCart {
  display: flex;
}
.sectitle {
  font-weight: bold;
}
.qtyBadge {
  border-style: solid;
  border-width: 2px;
  border-color: #1A1A1A;
  border-radius: 8px;
  width: 30px;
  padding: 6px;
  text-align: center;
  background-color: #009dc4;
  border: 2px;
}
.fancyButton {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 8px;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 20px;
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
import { useCartStore } from '../stores/cartStore';
import type { CartPreview } from '../stores/cartStore'
import { toCurrency } from '../util'
const cartStore = useCartStore()
defineProps<{
    cartProduct: CartPreview
}>();
</script>
