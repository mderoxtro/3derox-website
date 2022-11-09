<template>
  <div class="checkoutConfirm">
    <h1>Checkout - Confirm Details</h1>
    <div class="wrap">
    <div class="details">
    <h3>Shipping Information</h3>
    <p>Name: <input v-model="fullName" placeholder="who the package is shipping to"></p>
    <p>Address Line 1: <input v-model="addOne" placeholder="ex: 123 fake st."></p>
    <p>Address Line 2: <input v-model="addTwo" placeholder="ex: apt 21"></p>
    <p>City: <input v-model="city" placeholder="ex: New York"></p>
    <p>State: <input v-model="state" placeholder="ex: NY"></p>
    <p>Zip Code: <input v-model="zip" placeholder="ex: 73200"></p>
    </div>
    <div class="cartContents">
    <h3>Cart Contents</h3>
    <CheckoutCard
      v-for="(cartProduct, index) in formattedCart"
      :key="index"
      :cartProduct="cartProduct"
    />
    <p>Parts Total: {{ toCurrency(cartStore.total) }}</p>
    </div>
    </div>
    <div v-if="cartStore.total < 25" class="shipping">
    <button @click="calculateShipping">Calculate Shipping</button>
    <p>{{ shippingRates }}</p>
    </div>
  </div>

</template>

<style>
  .checkoutConfirm {
    min-height: 50vh;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    gap: 10px;
    flex-direction: column;
  }
  .cartContents {
    display: flex;
    flex-direction: column;
    min-width: 300px;
  }
  .wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .details {
    display: flex;
    flex-direction: column;
    min-width: 500px;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
</style>

<script setup>
import { computed } from 'vue';
import axios from 'axios';
import { toCurrency } from '../util';
import CheckoutCard from '../components/Checkout.vue';
import { useCartStore } from '../stores/cartStore';
const cartStore = useCartStore();
const formattedCart = computed(() => cartStore.formattedCart);

let shippingRates = []

calculateShipping: async function() {
    let payload = formatShipload()
    try {
      let calculatedShip = await axios.post('http://localhost:3000/calcship', {
        data: payload
      }).then((response) => console.log(response))
      console.log(calculatedShip)
    } catch (err) {
      console.log(err)
    }
}

let formatShipload = () => {
  let fromAddress = {
    name: "3DeRox LLC",
    street1: "125 Heartland Blvd",
    city: "Mulberry",
    state: "FL",
    zip: "33860",
    country: "US"
  }
  let toAddress = {
    name: "Bert",
    street1: "1345 Industrial Park Rd",
    city: "Mulberry",
    state: "FL",
    zip: "33860",
    country: "US",
  }
  let parcel = {
    length: "8",
    width: "8",
    height: "4",
    distance_unit: "in",
    weight: cartStore.totalWeight,
    mass_unit: "g"
  }
  let shipLoad = {
    address_from: fromAddress,
    address_to: toAddress,
    parcels: parcel
  }
  return shipLoad
}

let formatPayload = async () => {
  let allItems = []
  for(let item of formattedCart.value){
    let thisItem = {
      name: item.title,
      desc: item.custom,
      quantity: item.quantity,
      unit_amount: {
        currency_code: 'USD',
        value: item.indCost,
      },
    }
    allItems.push(thisItem)
  }
  let currentTotal = cartStore.total
  let payload = {
    purchase_units: [
      {
        items: allItems,
        amount: {
          currency_code: 'USD',
          value: currentTotal,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: currentTotal
            }
          }
        },
        shipping: {
          address: {
            country_code: 'US',
            address_line_1: '125 Heartland Blvd',
            address_line_2: '',
            admin_area_1: 'FL',
            admin_area_2: 'Mulberry',
            postal_code: '33860'
          },
          name: {
            full_name: "Phineas T. Higgenbottom"
          }
        }
      }
    ]
  }
  let test = await axios.post('http://localhost:3000/checkout/create', {
    data: payload,
  })
}
//formatPayload()
</script>
