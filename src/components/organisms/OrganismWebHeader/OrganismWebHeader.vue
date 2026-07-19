<script setup lang="ts"></script>

<template>
  <div
    class="organism-web-header bg-background fixed z-50 flex h-16 w-full items-center justify-between px-4"
  >
    <RouterLink to="/"> Brand </RouterLink>
    <AtomThemeToggle />
    <span class="sr-only">organism-web-header</span>
  </div>
</template>
