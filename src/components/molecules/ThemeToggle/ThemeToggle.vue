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

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Sun, Moon } from '@lucide/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
