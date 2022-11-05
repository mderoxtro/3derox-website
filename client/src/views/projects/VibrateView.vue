<template>
<div class="project">
  <h1>Vibration Dampener</h1>
  <p>A friend and former coworker, Rickey, came to Matt with a concept of a Vibration Dampener, and wanted a 3D Printed prototype.  Matt took his ideas and drawings, and built the idea out as a 3D Model, and successfully printed in white ABS.</p>
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
    min-height: 50vh;
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
        '/projVibrate/001.png',
        '/projVibrate/002.jpg',
        '/projVibrate/003.jpg',
        '/projVibrate/004.jpg',
      ]
    }
  }
}
</script>
