<script setup lang="ts">
import { computed } from 'vue'
import { NAVIGATION_LINKS, BRANDING } from '@/constants'
import { useAuth } from '@/composables/useAuth'
import { Menu } from '@lucide/vue'

const { isAuthenticated, logout } = useAuth()

const links = computed(() =>
  NAVIGATION_LINKS.filter((link) => (isAuthenticated.value ? link.to !== '/login' : true)),
)
</script>

<template>
  <header
    class="app-header bg-background fixed flex w-full items-center justify-between border-b px-6"
    role="banner"
  >
    <div class="container mx-auto flex items-center justify-between gap-4">
      <AppLogo :brand-name="BRANDING" link="/" />
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

      <div class="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon" class="md:hidden">
              <Menu class="h-6 w-6" />
              <span class="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" class="w-75 sm:w-100">
            <SheetTitle class="sr-only">Main Navigation</SheetTitle>
            <nav class="mt-8 flex flex-col gap-4" aria-label="Mobile navigation">
              <ul class="flex flex-col gap-4">
                <li v-for="link of links" :key="link.name">
                  <router-link
                    :to="link.to"
                    class="text-muted-foreground hover:text-foreground block text-lg font-medium transition-colors"
                  >
                    {{ link.name }}
                  </router-link>
                </li>
              </ul>

              <div v-if="isAuthenticated" class="mt-4 border-t pt-4">
                <Button variant="outline" class="w-full justify-start" @click="logout">
                  Logout
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>

    <span class="sr-only"> Main site header with logo, primary navigation, and theme toggle </span>
  </header>
</template>
