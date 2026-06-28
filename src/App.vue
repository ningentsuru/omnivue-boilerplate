<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout' // Ensure .vue extension if needed
import AuthLayout from '@/layouts/AuthLayout'
import ErrorLayout from '@/layouts/ErrorLayout'

const route = useRoute()

const layouts = {
  DefaultLayout,
  AuthLayout,
  ErrorLayout,
}

const CurrentLayout = computed(() => {
  const layoutName = route.meta.layout || 'DefaultLayout'
  return layouts[layoutName] || DefaultLayout
})
</script>

<template>
  <component :is="CurrentLayout">
    <!-- Transition must be inside router-view -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </component>
</template>
