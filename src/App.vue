<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout'
import { usePlatform } from '@/composables/usePlatform'

const { platform } = usePlatform()

onMounted(() => {
  document.documentElement.classList.add(`platform-${platform}`)
})
</script>

<template>
  <AppLayout />
</template>
