<template>
<div class="project">
  <h1>1988 Pontiac Trans Am</h1>
  <p>The car that started it Gallery.  3DeRox founder Matt purchased this car back in 2010.  An original Pontiac Trans Am GTA, complete with 305 TPI Motor, 700R4 Transmission, ~100,000 miles at the time, leaky T-Tops, and a variety of issues that had popped up over the car's 22 year history.</p>
  <p>Daily driven in Florida without AC until the engine started knocking after a 'spirited' run on I-4 sometime in 2012.  Still daily driven after swapping in a remanufactured 305 until July of 2014, when Matt purchased a daily-driver (Subaru WRX) that had AC.  The Trans Am was retired from service and became a project.</p>
  <p>New tires, new paint, new weatherstripping, new seals for the transmission, all new suspension components and bushings, new fuel pump, new exhaust system, repairs to the rusty t-tops and areas of the floor pans, repairs to the rear hatch, replacing a damaged passenger door and fender, a seemingly endless list of modifications and repairs.  The car currently wears Gunmetal Gray Metallic paint, with the original gold GTA wheels, with the interior 'coming soon' - but it runs, drives, and stops better than it has in the last 10+ years.</p>
  <p></p>
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
        '/proj88/001.jpg',
        '/proj88/002.jpg',
        '/proj88/003.jpg',
        '/proj88/004.jpg',
        '/proj88/005.jpg',
        '/proj88/006.jpg',
        '/proj88/007.jpg',
        '/proj88/008.jpg',
        '/proj88/009.jpg',
        '/proj88/010.jpg',
        '/proj88/011.jpg',
        '/proj88/012.jpg',
        '/proj88/013.jpg',
        '/proj88/014.jpg',
        '/proj88/015.jpg',
        '/proj88/016.jpg',
        '/proj88/017.jpg',
        '/proj88/018.jpg',
        '/proj88/019.jpg',
        '/proj88/020.jpg',
        '/proj88/021.jpg',
        '/proj88/022.jpg',
        '/proj88/023.jpg',
        '/proj88/024.jpg',
        '/proj88/025.jpg',
        '/proj88/026.jpg',
        '/proj88/027.jpg',
        '/proj88/028.jpg',
      ]
    }
  }
}
</script>
