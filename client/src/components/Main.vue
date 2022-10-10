<template>
  <div class="main">
  
  </div>
  <div class="gallery">
    <img class="image" id="image" src="/eye-catch.png">
    <div class="text">
      <p>Seriously.  We sell 3D Printed Parts.  We can also do custom designs.  Give money, plz.</p>
    </div>
  </div>

</template>

<style scoped>

.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
}
.gallery {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  animation: fadeIn ease 2s;
  -webkit-animation: fadeIn ease 2s;
  -moz-animation: fadeIn ease 2s;
  -o-animation: fadeIn ease 2s;
  -ms-animation: fadeIn ease 2s;
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

<script setup>
  import { onMounted } from 'vue'
  let images = [
    {
      src: "/favicon.ico",
      alt: "",
    },
    {
      src: "/logo.png",
      alt: ""
    },
    {
      src: "/eye-catch.png",
      alt: ""
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
