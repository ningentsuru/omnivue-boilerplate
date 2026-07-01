<script setup lang="ts">
interface Props {
  brandName: string
  link: string
}
withDefaults(defineProps<Props>(), {
  brandName: '',
  link: '',
})
</script>

<template>
  <div class="app-logo shrink-0">
    <h1 class="text-foreground text-xl font-bold">
      <router-link :to="link"> {{ brandName }} </router-link>
    </h1>
    <span class="sr-only">app-logo</span>
  </div>
</template>
