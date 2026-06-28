<script setup lang="ts"></script>

<template>
  <div class="default-layout">
    <BaseHeader />
    <main class="container mx-auto">
      <slot />
    </main>
    <BaseFooter />
    <span class="sr-only">default-layout</span>
  </div>
</template>
