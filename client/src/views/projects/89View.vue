<template>
<div class="project">
  <h1>1989 Pontiac Trans Am</h1>
  <p>A car that started with so much hope.  An original 1989 Pontiac Trans Am GTA, hardtop, with the 350 TPI motor and 700R4 Transmission.  Matt, one to repeat the same mistake many times, opted to purchase it - either to restore in place of the 1988 GTA, or to use as parts to aid in the restoration of that car.</p>
  <p>Turns out, parts were all it was good for.  The car had a decent paint job, but it was masking extensive body damage from a previous rear-end collision.  Not to mention the roof shell was separating from the supports, the firewall had rusted all the way through, and the floor boards were long gone and replaced with fiberglass.</p>
  <p>Thankfully, it paid for itself in spare parts - an original spoiler, extra ground effects, a door and fender to replace the damaged ones on the 1988 GTA, a spare set of original GTA wheels, and a rebuildable 350 motor.  Also, it was crushed with forklifts and scrapped after donating everything of value.  A win all the way around.</p>
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
        '/proj89/001.jpg',
        '/proj89/002.jpg',
        '/proj89/003.jpg',
        '/proj89/004.jpg',
        '/proj89/005.jpg',
        '/proj89/006.jpg',
        '/proj89/007.jpg',
        '/proj89/008.jpg',
        '/proj89/009.jpg',
        '/proj89/010.jpg',
        '/proj89/011.jpg',
        '/proj89/012.jpg',
        '/proj89/013.jpg',
        '/proj89/014.jpg',
      ]
    }
  }
}
</script>
