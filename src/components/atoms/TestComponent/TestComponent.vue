<script setup lang="ts">
interface Props {
  string: string;
}
withDefaults(defineProps<Props>(), {
  string: '',
});
</script>

<template>
  <div class="test-component">
    <span class="sr-only">test-component</span>
  </div>
</template>
