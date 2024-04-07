<script setup lang="ts">
const locationTemplate = useState("locationTemplate", () => "");
const dateRange = useState("dateRange", () => ref({ from: "2020/07/08", to: "2020/07/17" }));
// const locations = useState("locations", () => []);

const proxyDateRange = useState("proxyDateRange", () => ref({ from: "2020/07/08", to: "2020/07/17" }));

function updateProxy() {
  proxyDateRange.value = { ...dateRange.value };
}

function save() {
  dateRange.value = { ...proxyDateRange.value };
}

// const getLocationsByTemplate = () => {
//   callOnce(async () => {
//     await $fetch("https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json").then(
//       (resp: any) => (locations.value = resp.results)
//     );
//   });
// };

// watch(locations, () => console.log(locations.value));
</script>

<template>
  <!-- <input placeholder="City name" v-model="locationTemplate" @keyup.enter="getLocationsByTemplate" />

  <button @click="getLocationsByTemplate">Search {{ locationTemplate }}</button> -->

  <div class="row" style="height: 100vh; justify-content: center; align-items: center">
    <div class="row col-12" style="padding: 10px; min-width: 350px; max-width: 900px">
      <q-input class="col-12" v-model="locationTemplate" label="City name or Location key word">
        <template v-slot:prepend>
          <q-icon name="place" color="primary" />
        </template>
        <template v-slot:append v-if="locationTemplate !== ''">
          <q-btn stretch flat icon="close" @click="locationTemplate = ''" class="cursor-pointer" />
          <q-separator vertical inset />
          <q-btn stretch flat icon="search" class="cursor-pointer" />
        </template>
      </q-input>

      <div class="col-xs-12 col-sm-4 col-md-3" style="height: 100px; background-color: rosybrown"></div>

      <div class="col-xs-12 col-sm-8 col-md-9" style="height: 400px; background-color: darkseagreen">
        <div class="google-map" ref="googleMap"></div>
      </div>

      <q-separator style="width: 100%; margin: 5px 0" />

      <q-btn class="col-12" icon="event" flat color="primary" align="between" style="height: 50px">
        <q-popup-proxy @before-show="updateProxy" transition-show="fade" transition-hide="fade">
          <q-date range v-model="proxyDateRange">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
        <div class="text-center">
          {{ dateRange }}
        </div>
      </q-btn>
    </div>
  </div>

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
