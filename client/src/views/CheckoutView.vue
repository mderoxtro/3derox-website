cd <template>
  <div class="checkoutConfirm">
    <h1>Checkout - Confirm Details</h1>
    <div class="wrap">
    <div class="details">
    <h3>Shipping Information</h3>
    <p><input v-model="firstName" placeholder="First Name" class="fancyInput" @keyup="validateInput"><input v-model="lastName" placeholder="Last Name" class="fancyInput" @keyup="validateInput"></p>
    <div v-if="errors.firstName"><span class="requiredField">{{ errors.firstName }}</span></div>
    <div v-if="errors.secondName"><span class="requiredField">{{ errors.secondName }}</span></div>
    <p><input v-model="email" placeholder="Email Address" class="fancyInputLong" @keyup="validateInput"></p>
    <div v-if="errors.email"><span class="requiredField">{{ errors.email }}</span></div>
    <p><input v-model="addOne" placeholder="Address Line 1, ex: 123 Fake St." class="fancyInputLong" @keyup="validateInput"></p>
    <div v-if="errors.address"><span class="requiredField">{{ errors.address }}</span></div>
    <p><input v-model="addTwo" placeholder="Address Line 2, ex: Apt 321" class="fancyInputLong" @keyup="validateInput"></p>
    <p><input v-model="city" placeholder="City, ex: New York" class="fancyInput" @keyup="validateInput"><select v-model="state" class="fancySelectState" @change="validateInput"><option v-for="usState in allStates" :value="usState.value">{{ usState.display }}</option></select></p>
    <div v-if="errors.city"><span class="requiredField">{{ errors.city }}</span></div>
    <div v-if="errors.state"><span class="requiredField">{{ errors.state }}</span></div>
    <p><input v-model="zip" placeholder="Zip Code, ex: 73200" class="fancyInput" @keyup="validateInput"></p>
    <div v-if="errors.zip"><span class="requiredField">{{ errors.zip }}</span></div>
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
    <button @click="cartStore.calcShip(formatShipload())" class="fancyButton" :disabled="checkErrors(errors)">Calculate Shipping</button>
    <div class="shippy">
    <select v-model="rateSelected" class="fancyRate">
    <option :value="" disabled selected hidden>Calculate, Then Select Shipment Method</option>
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
  .requiredField {
    color: red;
    font-weight: bold;
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
import { buildSettings } from '../buildSettings.js'
import formValidation from '../formValidation.js'
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

let submissionError = computed(() => {
  console.log(checkErrors())
})

let input = ref("")
const { validateFirstNameField, validateSecondNameField, validateEmailField, validateAddress, validateCity, validateState, validateZip, errors } = formValidation()
const validateInput = () => {
  validateFirstNameField("firstName", props.firstName)
  validateSecondNameField("secondName", props.lastName)
  validateEmailField("email", props.email)
  validateAddress("address", props.addOne)
  validateCity("city", props.city)
  validateState("state", props.state)
  validateZip("zip", props.zip)
}

let submitButtonText = reactive({
  text: "Proceed to Payment"
})

let checkErrors = (errors) => {
  if(errors.firstName !== "" || errors.secondName !== "" || errors.email !== "" || errors.address !== "" || errors.city !== "" || errors.state !== "" || errors.zip !== ""){
    return true
  } else {
    return false
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
        name: item.title + " " + item.custom,
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
    let testUrl = ""
    if(buildSettings.isProduction){
      testUrl = "https://3derox.com:3000/checkout/create"
    } else {
      testUrl = "http://localhost:3000/checkout/create"
    }
    let test = await axios.post(testUrl, {
      data: payload,
    })
    if(test.data.details){
      submitButtonText.text = "Error Encountered"
      return "Error"
    } else {
      let approveLink = test.data.links.filter(link => link.rel == "approve")
      let orderID = test.data.id
      cartStore.addOrderID(orderID)
      cartStore.addApproveUrl(approveLink[0].href)
      return approveLink[0].href
    }
  } catch (error) {
    submitButtonText.text = "Error Encountered"
    console.log(error)
  }

}

</script>
