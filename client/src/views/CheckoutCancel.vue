<template>
  <div class="complete">
  <p>No worries!  We are voiding Order ID {{ cartStore.getOrderID }} with Paypal - this should take no longer than 3 hours.</p>
  <p>Would you like to empty your cart as well?</p>
  
  </div>
</template>

<style>
  .complete {
    min-height: 100vh;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    gap: 10px;
    flex-direction: column;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
  .sectitle {
    font-weight: bold;
  }
</style>

<script setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';
import { toCurrency, allStates } from '../util';
import CheckoutCard from '../components/CompleteCheckout.vue';
import { useCartStore } from '../stores/cartStore';
const cartStore = useCartStore();
const formattedCart = computed(() => cartStore.formattedCart);

let test = await axios.post('http://localhost:3000/checkout/cancel', {
      data: {
        orderID: cartStore.getOrderID
      },
})

</script>
