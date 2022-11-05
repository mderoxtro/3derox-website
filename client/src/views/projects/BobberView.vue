<template>
<div class="project">
  <h1>Fishing Bobber</h1>
  <p>3DeRox is proud to announce that this design is PATENT PENDING.</p>
  <p>Rodney, a friend of Matt's, approached with an idea for a fishing bobber that hadn't been done before.  With concepts and a prototype that Rodney had made, the duo remade the design in 3D, printed prototypes, passed them on as concepts to potential sales partner, and Rodney was able to use the drawings and models to file a patent request.</p>
  <p>The project has had further revisions that cannot yet be shown, and Rodney is currently working towards a manufacturing partner.</p>
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
        '/projBobber/001.png',
        '/projBobber/002.jpg',
        '/projBobber/003.jpg',
        '/projBobber/004.jpg',
        '/projBobber/005.jpg',
        '/projBobber/006.jpg',
        '/projBobber/007.jpg',
        '/projBobber/008.jpg',
      ]
    }
  }
}
</script>
