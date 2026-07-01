<script setup lang="ts">
import { ROUTES } from '@/constants'
</script>

<template>
  <header class="mobile-header bg-background fixed flex items-center">
    <nav class="flex w-screen justify-between px-4">
      <h1 class="text-xl font-bold">
        <router-link :to="ROUTES.LANDING_VIEW.path"> OmniVue </router-link>
      </h1>
      <ThemeToggle />
    </nav>
    <span class="sr-only">mobile-header</span>
  </header>
</template>
