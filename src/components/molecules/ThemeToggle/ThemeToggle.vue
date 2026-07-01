<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Sun, Moon } from '@lucide/vue'
import { useDark, useToggle } from '@vueuse/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { usePlatform } from '@/composables/usePlatform'

const { isMobile } = usePlatform()
const isDark = useDark()
const toggleFn = useToggle(isDark)
const toggleDark = () => {
  toggleFn()
  if (isMobile.value) StatusBar.setStyle({ style: isDark.value ? Style.Dark : Style.Light })
}
</script>

<template>
  <Button
    class="toggle-theme h-5 w-5 cursor-pointer rounded-full p-4"
    variant="outline"
    @click.prevent="toggleDark()"
  >
    <Sun v-if="!isDark" />
    <Moon v-else />
    <span class="sr-only">theme-toggle</span>
  </Button>
</template>
