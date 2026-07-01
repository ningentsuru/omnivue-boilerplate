<script setup lang="ts"></script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main class="container mx-auto">
      <slot />
    </main>
    <AppFooter />
    <span class="sr-only">default-layout</span>
  </div>
</template>
