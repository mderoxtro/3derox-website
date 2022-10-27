<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Main from './components/Main.vue'
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
      <RouterLink to="/main">Design Services</RouterLink>
    </div>
    </nav>
    <signin class="signin-links">
    <div class="links">
    Register
    </div>
    <div class="links">
    Sign In
    </div>
    </signin>
    </div>
    <div class="two">
    <Main />
    </div>
  </header>

  <RouterView />
  <div class="footer">
  <p>All Rights Reserved.  © 3DeRox, LLC 2022 | <a href="https://www.3derox.com">www.3derox.com</a></p>
  </div>
</template>

<style scoped>
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
.signin-links {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
