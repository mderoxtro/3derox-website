<template>
  <div class="main">
  
  </div>


</template>

<style scoped>

.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
}
</style>

<script setup>
  import { onMounted } from 'vue'
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
  let switchImage = () => {
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
  onMounted(() => {
    setInterval(switchImage, 10000)
  })
</script>
