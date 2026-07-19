<script setup lang="ts">
import { ref, computed, onMounted, type Component } from 'vue'
import { useApi } from '@/composables/useApi'
import { usePlatform } from '@/composables/usePlatform'
import { useDateFormat } from '@/composables/useDateFormat'
import SunnySvg from '@/assets/images/svgs/sunny.svg'
import RainnySvg from '@/assets/images/svgs/rainny.svg'
import NightySvg from '@/assets/images/svgs/nighty.svg'
import { Sun, Moon, CloudRain } from '@lucide/vue'

const { get } = useApi()
const weatherData = ref()
const { isWeb } = usePlatform()
const { unixAndTimezoneFormat } = useDateFormat()

const isLoading = ref<boolean>(false)
const city = ref<string>('Philippines')

const getTemperature = computed(() => {
  if (isLoading.value) return '...'
  const temp = weatherData.value?.data?.main?.temp
  return temp ? `${temp} °C` : 'N/A'
})

const getTemperatuireFahrenheit = computed(() => {
  if (isLoading.value) return '...'
  const temp = weatherData.value?.data?.main?.temp
  return temp ? `${((temp * 9) / 5 + 32).toFixed(2)} °F` : 'N/A'
})

const getDescription = computed(() => {
  if (isLoading.value) return '...'
  const description = weatherData.value?.data?.weather?.[0]?.description
  return description ? description : 'N/A'
})

const getName = computed(() => {
  if (isLoading.value) return '...'
  const name = weatherData.value?.data?.name
  return name ? name : 'N/A'
})

const getCountry = computed(() => {
  if (isLoading.value) return '...'
  const country = weatherData.value?.data?.sys?.country
  return country ? country : 'N/A'
})

const getSvg = computed(() => {
  return getWeatherCondition(SunnySvg, NightySvg, RainnySvg)
})

const getIcon = computed(() => {
  return getWeatherCondition(Sun, Moon, CloudRain)
})

async function getWeather() {
  isLoading.value = true
  try {
    const baseUrl = isWeb.value ? '/api/weather' : import.meta.env.VITE_OPENWEATHER_URL
    const result = await get(
      `${baseUrl}?q=${city.value}&units=metric${!isWeb.value ? `&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}` : ''}`,
    )
    weatherData.value = result
  } catch (error) {
    console.error('Failed to fetch weather:', error)
    weatherData.value = null
  } finally {
    isLoading.value = false
    city.value = ''
  }
}

function getWeatherCondition(
  sunny: Component | string,
  nighty: Component | string,
  rainny: Component | string,
): Component | string {
  if (isLoading.value || !weatherData.value?.data) return sunny

  const { dt, timezone, weather } = weatherData.value.data
  const description = weather?.[0]?.description || ''

  const hour = Number(unixAndTimezoneFormat(dt, timezone, 'HH'))

  const isRainy =
    description.toLowerCase().includes('rain') ||
    description.toLowerCase().includes('drizzle') ||
    description.toLowerCase().includes('thunder')

  if (isRainy) return rainny
  return hour >= 6 && hour < 18 ? sunny : nighty
}

onMounted(() => {
  getWeather()
})
</script>

<template>
  <Card class="home-view">
    <CardContent class="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <component :is="getSvg" class="h-100 w-full sm:h-180 sm:w-1/2" />
      <CardDescription class="flex flex-col items-center justify-center gap-4 sm:w-1/2">
        <div class="flex items-center gap-4">
          <component
            v-if="getIcon"
            :is="getIcon"
            class="h-[clamp(1rem,10vw,20rem)] w-[clamp(1rem,10vw,20rem)]"
          />
          <div class="flex flex-col">
            <span class="text-[clamp(1rem,4vw,2rem)]">
              {{ getTemperature }} / {{ getTemperatuireFahrenheit }}
            </span>
            <span class="text-[clamp(1rem,4vw,2rem)] capitalize"> {{ getDescription }} </span>
            <span class="text-[clamp(1rem,4vw,2rem)] capitalize">
              {{ getName }}, {{ getCountry }}
            </span>
          </div>
        </div>
        <form class="flex flex-col gap-2 sm:w-1/2" @submit.prevent="getWeather">
          <Input type="text" v-model="city" placeholder="Enter city name" />
          <Button type="submit" variant="default" class="w-full" :disabled="!city"> Search </Button>
        </form>
      </CardDescription>
    </CardContent>
    <span class="sr-only">organism-get-current-weather</span>
  </Card>
</template>
