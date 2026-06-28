<script setup lang="ts"></script>

<template>
  <header class="floating-header bg-background fixed flex w-full items-center justify-between px-6">
    <div class="float-end container mx-auto flex items-center justify-end gap-4">
      <div class="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <router-link to="/" class="cursor-pointer"> Landing page </router-link>
        </Button>
        <ThemeToggle />
      </div>
    </div>
    <span class="sr-only">floating-header</span>
  </header>
</template>
