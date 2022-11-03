<template>
<div class="project">
  <h1>Screw Covers</h1>
  <p>This project started as a request on Facebook from a gentleman named Brett on Facebook / Thirdgen.org.  There are Camaros out there in the wild that have the door panels in them from Firebirds, and Camaro owners would love a screw cover that didn't have the Fire Chicken on it.</p>
  <p>The start was a blank slate screw cover, with a flat face in place of the design.  Then, the Camaro Emblem and 3rd Gen Fire Chicken were modeled and integrated as options.  Now, these parts are available for regular sale.</p>
  <div class="galcont">
  <Splide style="width: 600px; height: 400px;">
    <SplideSlide v-for="image in images">
      <img :src=image width="600" height="400" onclick="window.open(this.src)" class="fancypic">
    </SplideSlide>
  </Splide>
  </div>
</div>
</template>

<style scoped>
  .fancypic {
    border-radius: 8px;
  }
  .project {
    min-height: 100vh;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
    gap: 10px;
    flex-direction: column;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
  .galcont {
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<script>
import '@splidejs/vue-splide/css'
export default {
  data() {
    return {
      images: [
        '/projScrew/001.jpg',
        '/projScrew/002.jpg',
        '/projScrew/003.jpg',
        '/projScrew/004.jpg',
        '/projScrew/005.jpg',
        '/projScrew/006.jpg',
        '/projScrew/007.jpg',
        '/projScrew/008.jpg',
        '/projScrew/009.jpg',
        '/projScrew/010.jpg',
      ]
    }
  }
}
</script>
