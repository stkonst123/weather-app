<script setup lang="ts">
const selectedLocation = useState<LocationData>("selectedLocation");
const latitude = useState<number>("latitude");
const longitude = useState<number>("longitude");
const dateRangeFrom = useState<string>("dateRangeFrom");
const dateRangeTo = useState<string>("dateRangeTo");
const series = useState("series");
const chartOptions = useState("chartOptions");
const errorMessage = useState<string>("errorMessage");

const {
  data: temperatureData,
  pending,
  error,
} = await useLazyFetch("https://api.open-meteo.com/v1/forecast", {
  query: {
    latitude: latitude,
    longitude: longitude,
    hourly: "temperature_2m",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    start_date: dateRangeFrom,
    end_date: dateRangeTo,
  },
  transform: (resp: any) => toRaw(resp),
  watch: [latitude, longitude, dateRangeFrom, dateRangeTo],
});

watch(temperatureData, () => {
  if (temperatureData.value.error) {
    alert(temperatureData.value.error);
    return;
  }

  series.value = [
    {
      name: "t, " + temperatureData.value.hourly_units.temperature_2m,
      data: temperatureData.value.hourly.temperature_2m,
    },
  ];

  chartOptions.value = {
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
      categories: temperatureData.value.hourly.time,
      labels: {
        show: false,
      },
    },
  };
});

watch(error, () => {
  if (error.value) {
    errorMessage.value = error.value.message;
  }
});
</script>

<template>
  <ClientOnly v-if="!pending">
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