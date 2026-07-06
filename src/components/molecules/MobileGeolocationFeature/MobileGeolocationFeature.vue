<script setup lang="ts">
import { useNativeFeatures } from '@/composables/useNativeFeatures'

const { getCurrentLocation } = useNativeFeatures()

const locationStatus = ref('Not fetched')

const handleGetLocation = async () => {
  const loc = await getCurrentLocation()
  if (loc) locationStatus.value = `Lat: ${loc.coords.latitude}, Lng: ${loc.coords.longitude}`
}
</script>

<template>
  <div class="mobile-geolocation-feature">
    <button @click="handleGetLocation" class="rounded bg-green-500 p-2 text-white">
      📍 Get Location
    </button>
    <p>{{ locationStatus }}</p>

    <span class="sr-only">mobile-geolocation-feature</span>
  </div>
</template>
