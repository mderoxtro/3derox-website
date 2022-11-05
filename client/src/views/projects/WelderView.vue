<template>
<div class="project">
  <h1>Miller Bobcat Welder</h1>
  <p>A welder that worked with Matt, Tomas, had a special request one day - a statue replica of the welder he used at work, a Miller Bobcat 250.  Referencing the real thing, as well as technical drawings online, Matt reproduced the welder as a 3D Model, and then successfully printed in Blue ABS.</p>
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
        '/projWelder/001.jpg',
        '/projWelder/002.jpg',
        '/projWelder/003.jpg',
        '/projWelder/004.jpg'
      ]
    }
  }
}
</script>
