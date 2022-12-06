<template>
  <div class="complete">
  <h3>Thank you for your order!</h3>
  <p>Order ID {{ tempOrderId }} has been submitted successfully.  You should receive an email confirmation (to the email address provided on the payment screen) shortly.  3DeRox will package and ship your item(s), and update the Paypal order with tracking as soon as possible.</p>
  <p>Thank you for your business.</p>
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

let tempOrderId = cartStore.getOrderID
cartStore.removeOrder()
cartStore.removeAll()

</script>
