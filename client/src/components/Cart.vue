<template>
    <div class="inCart">
        <figure class="p-8">
        <img
            :src="cartProduct.image"
            alt="Card Image"
            width="200"
            height="150"
            class="fancypic"
        />
        </figure> 
        <div class="card-body">
            <h3 class="card-title">
                <router-link class="link link-hover" :to="`/product/${cartProduct.id}`">{{ cartProduct.title }}</router-link>
                <p>Debug: {{cartProduct.id}}</p>
            </h3>
            <p>{{cartProduct.custom}}</p>
            <p><span class="sectitle">Quantity Per Car:</span> {{ cartProduct.require }}</p>
            
            <div class="card-actions">
                <div class="btn-group">
                <span class="sectitle">Cart Quantity:</span> 
                    <button class="btn btn-primary" @click="cartStore.remove(cartProduct.id, cartProduct.customId)">-</button>
                    <button class="btn btn-ghost no-animation">{{ cartProduct.quantity }}</button>
                    <button class="btn btn-primary" @click="cartStore.add(cartProduct.id)">+</button>
                </div>
            </div>
            <p><span class="sectitle">Price Each:</span> {{ toCurrency(cartProduct.indCost) }}</p>
            <p><span class="sectitle">Sub Total:</span> {{ toCurrency(cartProduct.cost) }}</p>
        </div>
    </div>
</template>

<style scoped>
.fancypic {
  border-radius: 8px;
}
.inCart {
  display: flex;
}
.sectitle {
  font-weight: bold;
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
