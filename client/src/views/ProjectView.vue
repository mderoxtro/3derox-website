<template>
  <div class="projects">
    <h1>Projects</h1>
    <div class="proj-item">
    <img src="/project88.jpg" width="300" height="150">
    <RouterLink to="/projects/88">88 TRANS AM</RouterLink>
    <p>The car that started it all - 1988 Pontiac Trans Am GTA.</p>
    </div>
    <div class="proj-item">
    <img src="/project89.jpg" width="300" height="150">
    <RouterLink to="/projects/89">89 TRANS AM</RouterLink>
    <p>The car that donated parts - 1989 Pontiac Trans Am GTA.</p>
    </div>
    <div class="proj-item">
    <img src="/camaro-screwcovers.jpg" width="300" height="150">
    <RouterLink to="/projects/screw">SCREW COVERS</RouterLink>
    <p>Custom designed screw-covers.</p>
    </div>
    <div class="proj-item">
    <img src="/bobcat1.JPG" width="300" height="150">
    <RouterLink to="/projects/welder">MILLER BOBCAT WELDER</RouterLink>
    <p>Modeled Bobcat Welder.</p>
    </div>
    <div class="proj-item">
    <img src="/dampener.png" width="300" height="150">
    <RouterLink to="/projects/vibrate">VIBRATION DAMPENER</RouterLink>
    <p>Vibration Dampener from Concept.</p>
    </div>
    <div class="proj-item">
    <img src="/bobber.png" width="300" height="150">
    <RouterLink to="/projects/bobber">FISHING BOBBER</RouterLink>
    <p>Fishing Bobber from Concept.</p>
    </div>
    <div class="proj-item">
    <img src="/32ford.png" width="300" height="150">
    <RouterLink to="/projects/32">32 FORD</RouterLink>
    <p>32 Ford for BeamNG.</p>
    </div>
    <div class="proj-item">
    <img src="/swivel.png" width="300" height="150">
    <RouterLink to="/projects/grout">GROUT SWIVEL</RouterLink>
    <p>Grout Swivel.</p>
    </div>
    <div class="proj-item">
    <img src="/eevee-model.JPG" width="300" height="150">
    <RouterLink to="/projects/eevee">NOT EEVEE</RouterLink>
    <p>Definitely Not a Pokemon.</p>
    </div>
  </div>
</template>

<style>
  .projects {
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
  .proj-item {
    display: flex;
    justify-content: left;
    gap: 20px;
    align-items: center;
    text-align: center;
  }
</style>
