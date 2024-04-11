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
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <q-knob
      v-if="!pending"
      :min="0"
      :max="50"
      :thickness="0.05"
      :color="isMinus ? 'blue-10' : 'orange-10'"
      :track-color="isMinus ? 'blue-grey-3' : 'orange-2'"
      :class="isMinus ? 'text-blue-10' : 'text-orange-10'"
      v-model="displayedTemperature"
      size="120px"
      readonly
      show-value
    >
      <span class="temperature-value">{{ displayedTemperature }}</span>
      <span class="temperature-mark">°C</span>
    </q-knob>
  </transition>
</template>

<style>
.temperature-value {
  font-size: 48px;
}

.temperature-mark {
  font-size: 32px;
}

.brand {
  color: #a2aa33 !important;
  background: #a2aa33 !important;
}
</style>
