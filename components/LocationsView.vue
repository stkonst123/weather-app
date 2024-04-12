<script setup lang="ts">
const selectedLocation = useState<LocationData | null>("selectedLocation", () => null);
const locationTemplate = useState("locationTemplate");
const latitude = useState<number | null>("latitude", () => null);
const longitude = useState<number | null>("longitude", () => null);

const { data: locations, pending } = await useLazyFetch("https://geocoding-api.open-meteo.com/v1/search", {
  query: {
    name: locationTemplate,
    count: 10,
    language: "en",
    format: "json",
  },
  transform: (resp: any) => toRaw(resp).results as LocationData[],
  watch: [locationTemplate],
});

watch(selectedLocation, () => {
  latitude.value = selectedLocation.value ? selectedLocation.value.latitude : null;
  longitude.value = selectedLocation.value ? selectedLocation.value.longitude : null;
});
</script>

<template>
  <div v-if="locations" :class="selectedLocation ? 'col-xs-12 col-sm-4 col-md-3' : 'col-12'">
    <q-scroll-area :class="selectedLocation ? 'cards-container' : 'cards-container-full-lenght'">
      <q-list>
        <q-item
          clickable
          v-for="item in locations"
          :key="item.id"
          @click.capture="selectedLocation = item"
          class="location-card"
          :class="selectedLocation?.id === item?.id && 'selected-card'"
        >
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bolder"> {{ item.name }} </span>, {{ item.country }}
            </q-item-label>
            <q-item-label v-if="item.population" caption style="margin-bottom: 3px"
              >Population: {{ item.population }}</q-item-label
            >
            <!-- <div class="q-gutter-xs">
              <q-badge v-for="code in item.postcodes" :key="code" outline color="orange">{{ code }}</q-badge>
            </div> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>

  <div v-else-if="!pending" class="col-12 row justify-center" style="margin-top: 10px">
    <q-item-label class="col-12 text-h4 text-weight-bold text-orange text-center">No results</q-item-label>
    <q-item-label class="col-12 text-overline text-weight-bold text-primary text-center"
      >try to specify the request</q-item-label
    >
  </div>

  <div v-if="selectedLocation" class="col-xs-12 col-sm-8 col-md-9">
    <div class="map-container">
      <Map />

      <div class="temperature-container">
        <CurrentTemperature />
      </div>
    </div>
  </div>
</template>

<style>
.cards-container {
  height: 400px;
}

.cards-container-full-lenght {
  height: calc(100vh - 82px);
}

.location-card {
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
}

.location-card:hover {
  background-color: #f3f3f3;
}

.selected-card,
.selected-card:hover {
  background-color: orange;
}

.map-container {
  height: 400px;
  width: 100%;
  padding-left: 10px;
  position: relative;
}

.temperature-container {
  position: absolute;
  top: 50px;
  right: 50px;
}

@media (width <= 600px) {
  .cards-container {
    height: 150px;
  }

  .map-container {
    padding-left: 0;
    height: 230px;
  }

  .temperature-container {
    top: 20px;
    right: 20px;
  }
}
</style>
