<template>
  <div class="complete">
    <p>On clicking the "Approve Payment & Submit Order" button below, you will be authorizing Paypal to charge the source provided on the previous screen, for the order details listed below.  3DeRox will package and ship the items to the provided address, using the shipment method and speed selected.  If something doesn't look right, or you do not wish to proceed, please click the "Cancel Order" button.  If you need to change the payment method on Paypal, or adjust the shipping address, please click "Edit on Paypal".  Otherwise, please click "Approve Payment & Submit Order".</p>
    <p><span class="sectitle">Order ID:</span> {{ cartStore.getOrderID }}</p>
    <div class="cartContents">
    <p><span class="sectitle">Cart Contents:</span>    <CheckoutCard
          v-for="(cartProduct, index) in formattedCart"
          :key="index"
          :cartProduct="cartProduct"
        /></p>

    <p><span class="sectitle">Total:</span> {{ toCurrency(cartStore.total) }}</p>
    </div>
    <button class="fancyButton" @click="approveOrder()">Approve Payment & Submit Order</button>
    <button class="fancyButton" @click="redirectLink(cartStore.approveUrl)">Edit on Paypal</button>
    <button class="fancyButton" @click="$router.push('/checkout/cancel')">Cancel Order</button>
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
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { buildSettings } from '../buildSettings.js'
import axios from 'axios';
import { toCurrency, allStates } from '../util';
import CheckoutCard from '../components/CompleteCheckout.vue';
import { useCartStore } from '../stores/cartStore';
const cartStore = useCartStore();
const formattedCart = computed(() => cartStore.formattedCart);

const router = useRouter()

let redirectLink = (url) => {
  window.location = url
}

let approveOrder = async () => {
  try {
    let approveUrl = ""
    if(buildSettings.isProduction){
      approveUrl = "https://3derox.com:3000/checkout/complete"
    } else {
      approveUrl = "http://localhost:3000/checkout/complete"
    }
    let approve = await axios.post(approveUrl, {
          data: {
            orderID: cartStore.getOrderID
          },
    })
    router.push('/checkout/success')
  } catch(error) {
    router.push('/error')
  }
}



</script>
