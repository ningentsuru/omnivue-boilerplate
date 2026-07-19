<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const isNotHomePage = computed(() => route?.path !== '/')
</script>

<template>
  <div
    class="organism-mobile-header bg-background fixed z-50 flex h-16 w-full items-center justify-between px-4"
  >
    <RouterLink to="/"> {{ isNotHomePage ? 'Go Back' : 'Brand' }} </RouterLink>
    <AtomThemeToggle />
    <span class="sr-only">organism-mobile-header</span>
  </div>
</template>
