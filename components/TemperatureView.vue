<script setup lang="ts">
const props = defineProps({
  dataRange: String,
  selectedLocation: Object,
});

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
</script>

<template>
  <ClientOnly>
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
</template>
