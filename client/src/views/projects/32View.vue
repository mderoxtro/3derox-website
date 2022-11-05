<template>
<div class="project">
  <h1>32 Ford</h1>
  <p>Cars have always been a passion of Matt's.  One of his favorite games, BeamNG, is a full physics sandbox with soft-body physics, and realistic car destruction.  On a whim, he decided to create an entire car to upload as a mod for the game.</p>
  <p>For simplicity's sake, he selected a 32 Ford, as it would prove to be not-incredibly-difficult to model, and didn't exist in the game.  A complete car was made in 3DSMax - the wheels and tires, the engine, the body, all as individual parts.  The entire model was then given a shell programmed in jbeam.  With texture work and troubleshooting, it was eventually able to be used in-game, though a hard drive failure meant progress stopped.</p>
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
        '/proj32/001.png',
        '/proj32/002.png',
        '/proj32/003.png',
      ]
    }
  }
}
</script>
