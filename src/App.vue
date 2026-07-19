<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform'
import { setupStatusBar } from '@/composables/useStatusBar'
import { useBackButton } from '@/composables/useBackButton'

import TemplateWeb from '@/components/templates/TemplateWeb'
import TemplateDesktop from '@/components/templates/TemplateDesktop'
import TemplateMobile from '@/components/templates/TemplateMobile'

const { isMobile, platform } = usePlatform()

const layoutMap = {
  web: TemplateWeb,
  mobile: TemplateMobile,
  desktop: TemplateDesktop,
} as const

const getLayoutKey = () => {
  if (isMobile.value) return 'mobile' as const
  if (platform === 'web') return 'web' as const
  return 'desktop' as const
}

const currentLayout = shallowRef(layoutMap[getLayoutKey()] || TemplateWeb)

onMounted(() => {
  if (isMobile.value) {
    setupStatusBar()
    useBackButton()
  }
  document.documentElement.classList.add(`platform-${platform}`)
})
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
