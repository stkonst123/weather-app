<script setup lang="ts">
const locationTemplate = useState("locationTemplate", () => "");
const locations = useState("locations", () => []);

const getLocationsByTemplate = () => {
  callOnce(async () => {
    await $fetch("https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json").then(
      (resp: any) => (locations.value = resp.results)
    );
  });
};

watch(locations, () => console.log(locations.value));
</script>

<template>
  <input placeholder="City name" v-model="locationTemplate" @keyup.enter="getLocationsByTemplate" />

  <button @click="getLocationsByTemplate">Search {{ locationTemplate }}</button>

  <!-- <input
    class="Search__input"
    @keyup.enter="requestData"
    placeholder="npm package name” type="search"
    name="search"
    v-model="package"
  />

  <button class="Search__button" @click="requestData">Find</button>

  <div class="error-message" v-if="showError">{{ errorMessage }}</div>

  <h1 class="title" v-if="loaded">{{ packageName }}</h1>
  <line-chart v-if="loaded" :chart-data="downloads" :chart-labels="labels"></line-chart> -->
</template>
