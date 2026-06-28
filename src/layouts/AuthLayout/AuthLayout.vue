<script setup lang="ts"></script>

<template>
  <div class="auth-layout">
    <FloatingHeader />
    <main class="container mx-auto flex h-screen items-center justify-center">
      <slot />
    </main>
    <span class="sr-only">auth-layout</span>
  </div>
</template>
