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
  <div class="landing-view">
    <h1>Landing View</h1>
    <div class="markdown-body" v-html="html" />
    <span class="sr-only">landing-view</span>
  </div>
</template>
