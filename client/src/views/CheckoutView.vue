cd <template>
  <div class="checkoutConfirm">
    <h1>Checkout - Confirm Details</h1>
    <div class="wrap">
    <div class="details">
    <h3>Shipping Information</h3>
    <p><input v-model="firstName" placeholder="First Name" class="fancyInput"><input v-model="lastName" placeholder="Last Name" class="fancyInput"></p>
    <p><input v-model="email" placeholder="Email Address" class="fancyInputLong"></p>
    <p><input v-model="addOne" placeholder="Address Line 1, ex: 123 Fake St." class="fancyInputLong"></p>
    <p><input v-model="addTwo" placeholder="Address Line 2, ex: Apt 321" class="fancyInputLong"></p>
    <p><input v-model="city" placeholder="City, ex: New York" class="fancyInput"><select v-model="state" class="fancySelectState"><option :value="this.state" disabled hidden>Select State</option><option v-for="usState in allStates" :value="usState.value">{{ usState.display }}</option></select></p>
    <p><input v-model="zip" placeholder="Zip Code, ex: 73200" class="fancyInput"></p>
    </div>
    <div class="cartContents">
    <h3>Cart Contents</h3>
    <CheckoutCard
      v-for="(cartProduct, index) in formattedCart"
      :key="index"
      :cartProduct="cartProduct"
    />
    <p>Total: {{ toCurrency(cartStore.total) }}</p>
    </div>
    </div>
    <div v-if="cartStore.total < 25 && !cartStore.hasShipping" class="shipping">
    <button @click="cartStore.calcShip(formatShipload())" class="fancyButton">Calculate Shipping</button>
    <div class="shippy">
    <select v-model="rateSelected" class="fancyRate">
    <option :value="this.rateSelected" disabled selected hidden>Calculate, Then Select Shipment Method</option>
    <option v-for="rate in cartStore.formattedRates" :value="rate">
    <p>{{ toCurrency(rate.amount) }}</p>
    <p>&nbsp;&nbsp;{{ rate.carrier }}</p>
    <p>&nbsp;&nbsp;{{ rate.desc }},</p>
    <p>&nbsp;&nbsp;Estimated Days to Delivery: {{ rate.est_days }}</p>
    </option>
    </select>
    <button class="fancyButton" @click="cartStore.addShip(true, rateSelected)">Add Selected Shipment Method</button>
    </div>
    </div>
    <div v-else-if="cartStore.hasShipping || cartStore.total >= 25" class="payment">
    <button class="fancyButton" @click="changeButton" ref="submitButton">{{ submitButtonText.text }}</button>
    </div>
  </div>
</template>

<style>
  .fancyInput {
    height: 40px;
    min-width: 45%;
    font-size: 16px;
    border-radius: 8px;
  }
  .fancySelectState {
    height: 40px;
    min-width: 47%;
    font-size: 16px;
    border-radius: 8px;
  }
  .fancyInputLong {
    height: 40px;
    font-size: 16px;
    border-radius: 8px;
    width: 92%;
  }
  .fancyRate {
    border-radius: 8px;
    font-size: 16px;
    font-weight: 300;
    height: 50px;
    width: 60%;
  }
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
  .shipcard {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
</style>

<script setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios';
import { toCurrency, allStates } from '../util';
import CheckoutCard from '../components/Checkout.vue';
import { useCartStore } from '../stores/cartStore';
const cartStore = useCartStore();
const formattedCart = computed(() => cartStore.formattedCart);

const rateSelect = ref('rateSelected')
const rateSelected = rateSelect.value
const submitButton = ref('submitButton')

const props = defineProps({
  firstName: String,
  lastName: String,
  email: String,
  addOne: String,
  addTwo: String,
  city: String,
  state: String,
  zip: String,
  approveLink: String,
})
defineEmits([
  'update:firstName', 'update:lastName', 'update:email', 'update:addOne', 'update:addTwo', 'update:city', 'update:state', 'update:zip'
])

let submitButtonText = reactive({
  text: "Proceed to Payment"
})

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
    name: props.firstName + " " + props.lastName,
    street1: props.addOne,
    street2: props.addTwo,
    city: props.city,
    state: props.state,
    zip: props.zip,
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

let changeButton = async () => {
  submitButtonText.text = "Creating Order..."
  let approveLink = await formatPayload()
  window.location = approveLink
}

let formatPayload = async () => {
  let allItems = []
  for(let item of formattedCart.value){
    if(item.isShip){
      let thisItem = {
        name: "Shipping",
        desc: item.id,
        quantity: item.quantity,
        unit_amount: {
          currency_code: 'USD',
          value: item.indCost,
        },
      }
      allItems.push(thisItem)
    } else {
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
            address_line_1: props.addOne,
            address_line_2: props.addTwo,
            admin_area_1: props.state,
            admin_area_2: props.city,
            postal_code: props.zip
          },
          name: {
            full_name: props.firstName + " " + props.lastName
          }
        }
      }
    ]
  }
  try {
    let test = await axios.post('http://localhost:3000/checkout/create', {
      data: payload,
    })
    if(test.data.details){
      submitButtonText.text = "Error Encountered"
      console.log(test.data)
      return "Error"
    } else {
      let approveLink = test.data.links.filter(link => link.rel == "approve")
      let orderID = test.data.id
      cartStore.addOrderID(orderID)
      return approveLink[0].href
    }
  } catch (error) {
    submitButtonText.text = "Error Encountered"
    console.log(error)
  }

}

</script>
