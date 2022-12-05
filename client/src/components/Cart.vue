<template>
    <div class="inCart">
        <figure class="p-8">
        
        <img v-if="!cartProduct.isShip"
            :src="cartProduct.image"
            alt="Card Image"
            width="200"
            height="150"
            class="fancypic"
        />
        <img v-else
          src="/shipping.png"
          width="200"
          height="150"
          class="fancypic"
        />
        </figure> 
        <div class="card-body" v-if="!cartProduct.isShip">
            <h3 class="card-title">
                <router-link v-if="!cartProduct.isShip" class="link link-hover" :to="`/product/${cartProduct.id}`">{{ cartProduct.title }}</router-link>
            </h3>
            <p class="custom">{{cartProduct.custom}}</p>
            <p><span class="sectitle">Quantity Per Car:</span> {{ cartProduct.require }}</p>
            
            <div class="card-actions">
                <div class="btn-group">
                <span class="sectitle">Cart Quantity:</span> 
                    <button class="fancyQtyButton" @click="cartStore.remove(cartProduct.id, cartProduct.customId)">-</button>
                    <span class="fancyQtyButton" style="pointer-events: none;">{{ cartProduct.quantity }}</span>
                    <button class="fancyQtyButton" @click="cartStore.add(cartProduct.id, cartProduct.customId)">+</button>
                </div>
            </div>
            <p><span class="sectitle">Price Each:</span> {{ toCurrency(cartProduct.indCost) }}</p>
            <p><span class="sectitle">Sub Total:</span> {{ toCurrency(cartProduct.cost) }}</p>
        </div>
        <div class="card-body" v-else>
        <h3>
          <p>Shipping - {{ cartProduct.id }}</p>
        </h3>
        <p><span class="sectitle">Sub Total:</span> {{ toCurrency(cartProduct.cost) }}</p>
        <button class="fancyButton" @click="cartStore.remove(cartProduct.id, cartProduct.id)">Remove Shipping</button>
        </div>
    </div>
</template>

<style scoped>
.custom {
  font-size: 10px;
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
