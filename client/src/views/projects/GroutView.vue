<template>
<div class="project">
  <h1>Grout Swivel</h1>
  <p>Matt created this project out of spite - a functional replica of a Grout Swivel, used on APE Augers.  Taking an original part, and reference drawings for parts, he re-created the object as a 3D model, and printed out a version as one piece that successfully rotates in Matte Yellow PLA.</p>
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
        '/projGrout/001.png',
        '/projGrout/002.png',
        '/projGrout/003.jpg',
        '/projGrout/004.png',
      ]
    }
  }
}
</script>
