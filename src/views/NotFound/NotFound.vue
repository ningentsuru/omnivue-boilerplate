<script setup lang="ts"></script>

<template>
  <div class="not-found flex flex-col gap-4">
    <h1 class="text-4xl">404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Button variant="outline" asChild>
      <router-link to="/">Go Back Home</router-link>
    </Button>
    <span class="sr-only">not-found</span>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}
</style>
