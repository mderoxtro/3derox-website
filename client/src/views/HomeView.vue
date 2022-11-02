<script setup>
import Main from '../components/Main.vue'
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

<script>
let images = [
  {
    src: "/installed-upstop.jpg",
    alt: "Front Up Stop, installed."
  },
  {
    src: "/air-deflector.jpg",
    alt: "Air Deflector, installed."
  },
  {
    src: "/hatch-guides.jpg",
    alt: "Hatch Guides, installed."
  },
  {
    src: "/hatch-spacer.jpg",
    alt: "Hatch Spacer, installed."
  },
  {
    src: "/handle-insert.jpg",
    alt: "Handle Insert, installed."
  },
  {
    src: "/blender-light.JPG",
    alt: "Custom Third Brake Light."
  },
  {
    src: "/bobcat3.JPG",
    alt: "Miller Bobcat Welder."
  },
  {
    src: "/bobcat1.JPG",
    alt: "Custom 3D Model of Bobcat Welder."
  },
  {
    src: "/printer-arrangement.JPG",
    alt: "Full door plastic kit arranged for printing."
  }
]
let imageIndex = 0

export default {
  data() {
    return {
      interval: null
    }
  },
  mounted(){
    this.interval = setInterval(this.switchImage, 10000)
  },
  unmounted() {
    clearInterval(this.interval)
  },
  methods: {
    switchImage: function () {
      let imageContainer = document.getElementById("image")
      imageContainer.src = images[imageIndex].src
      imageContainer.classList.remove("image")
      imageContainer.offsetWidth
      imageContainer.classList.add("image")
      if(imageIndex+1 >= images.length){
        imageIndex = 0
      } else {
        imageIndex++
      }
    }
  }
}
</script>
