<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import AuthLayout from '@/layouts/AuthLayout'
import ErrorLayout from '@/layouts/ErrorLayout'
import MobileLayout from '@/layouts/MobileLayout'

import { usePlatform } from '@/composables/usePlatform'

const route = useRoute()

const { isMobile } = usePlatform()

const layouts = {
  DefaultLayout,
  AuthLayout,
  ErrorLayout,
  MobileLayout,
}

const CurrentLayout = computed(() => {
  const layoutName = route.meta.layout || 'DefaultLayout'
  return isMobile.value ? MobileLayout : layouts[layoutName] || DefaultLayout
})
</script>

<template>
  <component :is="CurrentLayout" class="app-layout">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
    <span class="sr-only">app-layout</span>
  </component>
</template>
