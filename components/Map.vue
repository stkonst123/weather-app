<script setup lang="ts">
const latitude = useState("latitude");
const longitude = useState("longitude");
const projection = ref("EPSG:4326");
const zoom = ref(4);
const rotation = ref(0);
</script>

<template>
  <ol-map style="height: 100%">
    <ol-view ref="view" :center="[longitude, latitude]" :zoom="zoom" :projection="projection" :rotation="rotation" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
  </ol-map>
</template>

<style scoped>
.ol-map {
  position: relative;
}
.ol-map-loading:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin-top: -40px;
  margin-left: -40px;
  border-radius: 50%;
  border: 5px solid rgba(180, 180, 180, 0.6);
  border-top-color: var(--vp-c-brand-1);
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
