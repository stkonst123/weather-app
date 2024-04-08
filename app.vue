<script setup lang="ts">
const locationTemplate = useState("locationTemplate", () => "");
const dateRange = useState("dateRange", () => ref({ from: "2020/07/08", to: "2020/07/17" }));
// const locations = useState("locations", () => []);

const proxyDateRange = useState("proxyDateRange", () => ref({ from: "2020/07/08", to: "2020/07/17" }));

const items = [
  {
    id: 2950159,
    name: "Berlin",
    latitude: 52.52437,
    longitude: 13.41053,
    population: 3426354,
    postcodes: {
      0: "10967",
      1: "13347",
    },
    country: "Germany",
  },
  {
    id: 2950149,
    name: "Berlino",
    latitude: 52.9,
    longitude: 1.41053,
    population: 46354,
    postcodes: {
      0: "10967",
    },
    country: "Austria",
  },
  {
    id: 2960159,
    name: "My Berlin",
    latitude: 43.52437,
    longitude: 23.41053,
    population: 5427754,
    postcodes: {
      0: "10967",
      1: "13347",
      2: "13447",
      4: "145447",
    },
    country: "US",
  },
  {
    id: 29159,
    name: "Berlin",
    latitude: 52.52437,
    longitude: 103.41053,
    population: 1426332,
    postcodes: {
      0: "10967",
    },
    country: "Japan",
  },
  {
    id: 21159,
    name: "Berlinnium",
    latitude: 2.52437,
    longitude: 3.41053,
    population: 2006354,
    postcodes: {
      0: "10967",
    },
    country: "Russia",
  },
];

const series = [
  {
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
];

const chartOptions = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Product Trends by Month",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
};

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
      <q-input
        class="col-12"
        v-model="locationTemplate"
        label="City name or Location key word"
        style="margin-bottom: 5px"
      >
        <template v-slot:prepend>
          <q-icon name="place" color="primary" />
        </template>
        <template v-slot:append v-if="locationTemplate !== ''">
          <q-btn stretch flat icon="close" @click="locationTemplate = ''" class="cursor-pointer" />
          <q-separator vertical inset />
          <q-btn stretch flat icon="search" class="cursor-pointer" />
        </template>
      </q-input>

      <div class="col-xs-12 col-sm-4 col-md-3">
        <q-scroll-area class="cards-container">
          <q-list>
            <q-item v-for="item in items" :key="item.id" class="location-card">
              <q-item-section>
                <q-item-label>{{ item.name }}, {{ item.country }}</q-item-label>
                <q-item-label caption style="margin-bottom: 3px">Population: {{ item.population }}</q-item-label>
                <div class="q-gutter-xs">
                  <q-badge v-for="code in item.postcodes" :key="code" outline color="orange">{{ code }}</q-badge>
                </div>
              </q-item-section>

              <!-- <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="star" color="primary" />
              </q-item-section> -->
            </q-item>

            <q-separator spaced inset />
          </q-list>
          <!-- <q-card v-for="item in items" :key="item.id" class="location-card">
            <q-card-section flat class="bg-grey text-white">
              <div class="text-h6">{{ item.name }}</div>
              <div class="text-subtitle2">{{ item.country }}</div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat>Action 1</q-btn>
              <q-btn flat>Action 2</q-btn>
            </q-card-actions>
          </q-card> -->
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-8 col-md-9">
        <div class="map-container">
          <div style="width: 100%; height: 100%; background-color: purple"></div>
        </div>
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

      <ClientOnly>
        <div class="col-12" id="chart">
          <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </ClientOnly>
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

<style>
.cards-container {
  height: 100%;
}

.location-card {
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
}

.location-card:hover {
  background-color: rgba(30, 143, 255, 0.181);
}

.map-container {
  height: 400px;
  width: 100%;
  padding-left: 10px;
}

@media (width <= 600px) {
  .cards-container {
    height: 150px;
  }

  .location-card {
    margin: 0 10px;
  }

  .map-container {
    padding-left: 0;
    height: 250px;
  }
}
</style>
