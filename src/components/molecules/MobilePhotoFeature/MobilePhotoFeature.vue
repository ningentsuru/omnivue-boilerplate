<script setup lang="ts">
import { useNativeFeatures } from '@/composables/useNativeFeatures'

const { takePhoto, chooseFromGallery } = useNativeFeatures()

const photoUrl = ref<string | null>(null)

const handleTakePhoto = async () => {
  const url = await takePhoto()
  if (url) photoUrl.value = url
}

const handleChooseFromGallery = async () => {
  const url = await chooseFromGallery()
  if (url) photoUrl.value = url
}
</script>

<template>
  <div class="mobile-photo-feature">
    <div class="flex flex-wrap gap-2">
      <button @click="handleTakePhoto" class="rounded bg-blue-500 p-2 text-white">
        📷 Take Photo
      </button>

      <button @click="handleChooseFromGallery" class="rounded bg-indigo-500 p-2 text-white">
        🖼️ Choose from Gallery
      </button>
    </div>

    <img v-if="photoUrl" :src="photoUrl" class="h-32 w-32 rounded object-cover" />

    <span class="sr-only">mobile-photo-feature</span>
  </div>
</template>
