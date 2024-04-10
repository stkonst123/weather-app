<script setup lang="ts">
const locationTemplate = useState<string | null>("locationTemplate", () => null);
const locationTemplateTmp = useState<string | null>("locationTemplateTmp", () => null);
const selectedLocation = useState<LocationData | null>("selectedLocation");
const dateRange = useState<DataRange | string | null>("dateRange", () => null);
const proxyDateRange = useState<DataRange | string | null>("proxyDateRange", () => null);
const dateRangeFrom = useState<string | null>("dateRangeFrom", () => null);
const dateRangeTo = useState<string | null>("dateRangeTo", () => null);

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

function dateLimitTwoWeeks(date: DataRange | string) {
  const limitDate = getTwoWeeksDate(new Date());

  if (typeof date === "string") {
    return date <= limitDate;
  }

  return date.from <= limitDate && date.to <= limitDate;
}

watch(dateRange, () => {
  if (!dateRange.value) {
    dateRangeFrom.value = null;
    dateRangeTo.value = null;
    return;
  }

  if (typeof dateRange.value === "string") {
    dateRangeFrom.value = dateRange.value.replaceAll("/", "-");
    dateRangeTo.value = dateRange.value.replaceAll("/", "-");
    return;
  }

  dateRangeFrom.value = dateRange.value.from.replaceAll("/", "-");
  dateRangeTo.value = dateRange.value.to.replaceAll("/", "-");
});
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

      <LocationsView v-if="locationTemplate" />

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
          <q-date range v-model="proxyDateRange" :options="dateLimitTwoWeeks">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="saveDateRange" v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
        <div v-if="dateRange" class="text-h5">
          <span class="text-caption">From </span>
          {{ dateRangeFrom.replaceAll("-", ".") }}
          <span class="text-caption">to </span>
          {{ dateRangeTo.replaceAll("-", ".") }}
        </div>
      </q-btn>

      <TemperatureView v-if="selectedLocation && dateRange" />
    </div>
  </div>
</template>
