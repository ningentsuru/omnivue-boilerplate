<script setup lang="ts">
import { NAVIGATION_LINKS } from '@/constants'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated, logout } = useAuth()

const links = computed(() =>
  NAVIGATION_LINKS.filter((link) => (isAuthenticated.value ? link.to !== '/login' : true)),
)
</script>

<template>
  <header
    class="base-header bg-background flex w-full items-center justify-between border-b px-6"
    role="banner"
  >
    <div class="container mx-auto flex items-center justify-between gap-4">
      <div class="logo-area shrink-0">
        <h1 class="text-foreground text-xl font-bold">
          <router-link to="/"> vue3-shadcn-universal </router-link>
        </h1>
      </div>

      <nav class="nav-area hidden items-center gap-6 md:flex" aria-label="Main navigation">
        <ul class="flex items-center gap-6">
          <li v-for="link of links" :key="link.name">
            <router-link
              :to="link.to"
              class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <div v-if="isAuthenticated">
          <Button variant="ghost" class="cursor-pointer" @click.prevent="logout">Logout</Button>
        </div>

        <div class="actions-area shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </div>

    <span class="sr-only"> Main site header with logo, primary navigation, and theme toggle </span>
  </header>
</template>
