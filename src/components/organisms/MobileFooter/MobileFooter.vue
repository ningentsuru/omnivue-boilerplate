<script setup lang="ts">
import { ROUTES } from '@/constants'
import { useAuth } from '@/composables/useAuth'

const { logout, isAuthenticated } = useAuth()
</script>

<template>
  <footer
    class="mobile-footer bg-background fixed bottom-0 flex w-screen items-center justify-evenly border-t px-4"
  >
    <nav class="flex justify-around space-x-2">
      <router-link :to="ROUTES.DASHBOARD_VIEW.path">Dashboard</router-link>
      <router-link :to="ROUTES.ABOUT_VIEW.path">About</router-link>
      <router-link :to="ROUTES.READ_ME_VIEW.path">Read me</router-link>
      <router-link :to="ROUTES.MOBILE_FEATURES_VIEW.path">Mobile features</router-link>
      <Button
        v-if="isAuthenticated"
        variant="link"
        class="text-md h-fit cursor-pointer p-0"
        @click.prevent="logout"
      >
        <span>Logout</span>
      </Button>
      <router-link v-else :to="ROUTES.LOGIN_VIEW.path">Login</router-link>
    </nav>
    <span class="sr-only">mobile-footer</span>
  </footer>
</template>
