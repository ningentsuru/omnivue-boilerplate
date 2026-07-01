<script setup lang="ts">
import { ROUTES } from '@/constants'
</script>

<template>
  <footer
    class="mobile-footer bg-background fixed bottom-0 flex w-screen items-center justify-center border-t px-4"
  >
    <nav class="flex justify-around space-x-2">
      <router-link :to="ROUTES.DASHBOARD_VIEW.path">Dashboard</router-link>
      <router-link :to="ROUTES.ABOUT_VIEW.path">About</router-link>
      <router-link :to="ROUTES.READ_ME_VIEW.path">ReadMe</router-link>
    </nav>
    <span class="sr-only">mobile-footer</span>
  </footer>
</template>
