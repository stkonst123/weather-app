<script setup lang="ts">
const locationTemplate = useState<string | undefined | null>("locationTemplate");
const locationTemplateTmp = useState<string | undefined | null>("locationTemplateTmp");
const dateRange = useState("dateRange");
const proxyDateRange = useState("proxyDateRange");
const selectedLocation = useState("selectedLocation");

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

function updateProxyDateRange() {
  proxyDateRange.value = dateRange.value;
}

function saveDateRange() {
  dateRange.value = proxyDateRange.value;
}

function clearLocationTemplate() {
  locationTemplate.value = null;
  locationTemplateTmp.value = null;
  selectedLocation.value = null;
  dateRange.value = null;
}
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
          <q-btn stretch flat icon="close" @click="clearLocationTemplate" class="cursor-pointer" />
          <q-separator vertical inset />
          <q-btn stretch flat icon="search" @click="locationTemplate = locationTemplateTmp" class="cursor-pointer" />
        </template>
      </q-input>

      <LocationsView
        v-if="locationTemplate"
        :locationTemplate="locationTemplate"
        @response="(selectedLocation) => (selectedLocation = selectedLocation)"
      />

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
        <q-popup-proxy @before-show="updateProxyDateRange" transition-show="fade" transition-hide="fade">
          <q-date range v-model="proxyDateRange">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="saveDateRange" v-close-popup />
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
