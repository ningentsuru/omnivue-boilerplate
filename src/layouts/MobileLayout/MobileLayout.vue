<script setup lang="ts">
import { setupStatusBar } from '@/composables/useStatusBar'

onMounted(async () => {
  await setupStatusBar()
})
</script>

<template>
  <div class="mobile-layout">
    <div class="bg-background fixed top-0 min-h-(--mobile-safe-area-inset-top) w-screen" />
    <MobileHeader />
    <main>
      <slot />
    </main>
    <MobileFooter />
    <span class="sr-only">mobile-layout</span>
  </div>
</template>
