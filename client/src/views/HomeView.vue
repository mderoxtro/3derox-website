<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
  <div class="gallery">
    <img class="image" id="image" src="/printer-arrangement.JPG" height="400" width="600">
    <div class="text">
    <b>
      <p>3D Printed Parts for Classic Cars</p>
      <p>Design Services to bring ideas to life</p>
      <p>Passion, Compassion, and Ethics</p>
    </b>
    </div>
  </div>
  <TheWelcome />
  </main>
</template>

<style scoped>
.gallery {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.image {
  animation: fadeIn ease 2s;
  -webkit-animation: fadeIn ease 2s;
  -moz-animation: fadeIn ease 2s;
  -o-animation: fadeIn ease 2s;
  -ms-animation: fadeIn ease 2s;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 600px;
  height: 400px;
}
@keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
@-moz-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
@-webkit-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
@-o-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
@-ms-keyframes fadeIn {
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
</style>
