<script setup lang="ts">
const locationTemplate = useState("locationTemplate", () => null);
const locationTemplateTmp = useState("locationTemplateTmp", () => null);
const selectedLocation = useState("selectedLocation", () => null);
const dateRange = useState("dateRange", () => null);
const proxyDateRange = useState("proxyDateRange", () => null);
const locations = useState("locations");

const series = useState("series", () => [
  {
    name: "T, " + temperatureData.hourly_units.temperature_2m,
    data: temperatureData.hourly.temperature_2m,
  },
]);
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
    curve: "monotoneCubic",
    width: 3,
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: temperatureData.hourly.time,
    labels: {
      show: false,
    },
  },
};

function updateProxy() {
  proxyDateRange.value = dateRange.value;
}

function save() {
  dateRange.value = proxyDateRange.value;
}

function clearLocations() {
  locations.value = null;
  locationTemplate.value = null;
  locationTemplateTmp.value = null;
  selectedLocation.value = null;
}

// const getLocationsByTemplate = (template: string) => {
//   console.log(template);

//   async () => {
//     await $fetch(
//       `https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json`
//       // `https://geocoding-api.open-meteo.com/v1/search?name=${template}&count=10&language=en&format=json`
//     )
//       .then((resp) => (locations.value = toRaw(resp).results))
//       .catch(console.log);
//   };
// };

watch(selectedLocation, () => console.log(selectedLocation.value));
watch(locations, () => console.log(locations));
// watch(locationTemplate, () => {
//   console.log(locationTemplate.value);
//   getLocationsByTemplate(locationTemplate.value);
// });
</script>

<template>
  <div class="row" style="height: 100vh; justify-content: center; align-items: center; overflow-x: hidden">
    <div class="row col-12" style="padding: 10px; min-width: 350px; max-width: 900px">
      <q-input
        class="col-12"
        v-model="locationTemplateTmp"
        label="City name or Location key word"
        style="margin-bottom: 5px"
        @keydown.enter="locationTemplate = locationTemplateTmp"
      >
        <template v-slot:prepend>
          <q-icon name="place" color="primary" />
        </template>
        <template v-slot:append v-if="locationTemplateTmp">
          <q-btn stretch flat icon="close" @click="clearLocations" class="cursor-pointer" />
          <q-separator vertical inset />
          <q-btn stretch flat icon="search" @click="locationTemplate = locationTemplateTmp" class="cursor-pointer" />
        </template>
      </q-input>

      <LocationsView v-if="locationTemplate" :locationTemplate="locationTemplate" />

      <!-- <div v-if="locations" class="col-xs-12 col-sm-4 col-md-3">
        <q-scroll-area class="cards-container">
          <q-list>
            <q-item
              v-for="item in locations"
              :key="item.id"
              class="location-card"
              :class="selectedLocation?.id === item?.id && 'selected-card'"
            >
              <q-item-section @click="selectedLocation = item">
                <q-item-label>{{ item.name }}, {{ item.country }}</q-item-label>
                <q-item-label caption style="margin-bottom: 3px">Population: {{ item.population }}</q-item-label>
                <div class="q-gutter-xs">
                  <q-badge v-for="code in item.postcodes" :key="code" outline color="orange">{{ code }}</q-badge>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>

      <div v-if="locations" class="col-xs-12 col-sm-8 col-md-9">
        <div class="map-container">
          <div style="width: 100%; height: 100%; background-color: purple">
            <h2 style="padding: 0; margin: 0">Map view is under development</h2>
          </div>
        </div>
      </div> -->

      <q-separator v-if="selectedLocation" style="width: 100%; margin: 5px 0" />

      <q-btn
        v-if="selectedLocation"
        class="col-12"
        flat
        icon="event"
        color="primary"
        align="between"
        style="margin-bottom: 10px; font-size: 18px"
      >
        <q-popup-proxy @before-show="updateProxy" transition-show="fade" transition-hide="fade">
          <q-date range v-model="proxyDateRange">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
        <div v-if="dateRange" class="text-h5">
          <span class="text-caption">From </span>
          {{ dateRange.from }}
          <span class="text-caption">to </span>
          {{ dateRange.to }}
        </div>
      </q-btn>

      <ClientOnly v-if="dateRange">
        <div class="col-12" id="chart">
          <apexchart
            type="line"
            height="350"
            :options="{
              ...chartOptions,
              title: {
                text: `${selectedLocation.name}, ${selectedLocation.country}`,
                align: 'center',
                style: { fontSize: 18 },
              },
            }"
            :series="series"
          ></apexchart>
        </div>
      </ClientOnly>
    </div>
  </div>

  <!-- <div class="error-message" v-if="showError">{{ errorMessage }}</div> -->
</template>
