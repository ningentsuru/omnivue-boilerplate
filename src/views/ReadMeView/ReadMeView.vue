<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import readmeContent from '@/../README.md?raw'

const html = ref('')

onMounted(() => {
  const md = new MarkdownIt()
  html.value = md.render(readmeContent)
})
</script>

<template>
  <div class="read-me-view flex justify-center">
    <div class="markdown-body mx-auto w-[calc(100vw-2rem)] sm:w-screen" v-html="html" />
    <span class="sr-only">read-me-view</span>
  </div>
</template>
