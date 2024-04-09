<script setup lang="ts">
const selectedLocation = useState<LocationData>("selectedLocation");
const latitude = useState<number>("latitude");
const longitude = useState<number>("longitude");

const { data: currentTemperature, pending } = await useLazyFetch("https://api.open-meteo.com/v1/forecast", {
  query: {
    latitude: latitude,
    longitude: longitude,
    current: "temperature_2m",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  transform: (resp: any) => toRaw(resp).current.temperature_2m,
  watch: [latitude, longitude],
});

const displayedTemperature = useState<number>("displayedTemperature", () =>
  Math.abs(Math.round(currentTemperature.value))
);
const isMinus = useState<boolean>("isMinus", () => currentTemperature.value < 0);

watch(currentTemperature, () => {
  displayedTemperature.value = Math.abs(Math.round(currentTemperature.value));
  isMinus.value = currentTemperature.value < 0;
});
</script>

<template>
  <q-knob
    v-if="!pending"
    :min="0"
    :max="50"
    :thickness="0.05"
    :color="isMinus ? 'primary' : 'orange'"
    :track-color="isMinus ? 'grey-2' : 'orange-2'"
    :class="isMinus ? 'text-primary' : 'text-orange'"
    v-model="displayedTemperature"
    size="120px"
    readonly
    show-value
  >
    <span class="temperature-value">{{ displayedTemperature }}</span>
    <span class="temperature-mark">°C</span>
  </q-knob>
</template>

<style>
.temperature-value {
  font-size: 48px;
}

.temperature-mark {
  font-size: 32px;
}
</style>
