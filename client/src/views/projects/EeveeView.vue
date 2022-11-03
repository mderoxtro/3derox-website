<template>
<div class="project">
  <h1>Not A Pokemon</h1>
  <p>David, a coworker of Matt's, requested a 3D Printed statue of Eevee, as large as one could be made.  A 3D Model was found, lightly edited to include a face, and successfully printed ~10" tall in PLA material.</p>
  <p>For legal purposes, definitely not a Pokemon.</p>
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
        '/projEevee/001.jpg',
      ]
    }
  }
}
</script>
