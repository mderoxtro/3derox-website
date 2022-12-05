<script setup>
import './assets/fancies.css';
import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted } from 'vue'
import { usePersistCart } from './composables/usePersistCart'
import { useCartStore } from './stores/cartStore'
import { useProductStore } from './stores/productStore'

const productStore = useProductStore()
const cartStore = useCartStore()

productStore.fetchAll()
usePersistCart()

const count = computed(() => cartStore.count)

//store debug button:       <button @click="cartStore.removeAll">FORCE DUMP</button>
</script>

<template>
  <header>
    <div class="banner">
    Free shipping on all orders over $25.00 USD!
    </div>
    <div class="navbar">
    <img alt="3derox-logo" class="logo" src="/logo.png" height="128" width="167"/>
    <nav class="nav-links">
    <div class="links">
      <RouterLink to="/">Home</RouterLink>
    </div>
    <div class="links">
      <RouterLink to="/about">About</RouterLink>
    </div>
    <div class="links">
      <RouterLink to="/projects">Projects</RouterLink>
    </div>
    <div class="links">
      <RouterLink to="/parts">Parts</RouterLink>
    </div>
    <div class="links">
      <RouterLink to="/design">Design Services</RouterLink>
    </div>
    </nav>
    <div class="cart-links">
      <RouterLink to="/cart"><span class="cartOver">Cart</span><svg xmlns="http://www.w3.org/2000/svg" class="mat-icon" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg></RouterLink>
      <div class="qtyBadge" v-text="count"></div>
    </div>
    </div>
    <div class="two">
    </div>
  </header>

  <RouterView />
  <div class="footer">
  <p>All Rights Reserved.  © 3DeRox, LLC 2022 | <a href="https://www.3derox.com">www.3derox.com</a></p>
  </div>
</template>

<style scoped>
.mat-icon {
  display: inline-flex;
  vertical-align: top;
}
.banner {
  font-family: mokoto;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #009dc4;
  height: 30px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  height: 150px;
}
.nav-links {
  font-family: mokoto;
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-links {
  display: flex;
  margin-right: 70px;
  font-size: 18px;
  justify-content: space-between;
  align-items: center;
}
.cartOver {
  margin-right: 5px;
  font-family:mokoto;
  font-size: 15px;
  vertical-align: baseline;
}
.qtyBadge {
  border-style: 2px solid;
  border-radius: 8px;
  width: 30px;
  text-align: center;
  background-color: #009dc4;
  border: 2px;
}
.links {
  margin: 20px;
}
.footer {
  margin-top: 20px;
  display: flex;
  margin-left: auto;
  font-size: 15px;
  color: #A6A6A6;
  margin-right: auto;
  justify-content: center;
}
</style>
