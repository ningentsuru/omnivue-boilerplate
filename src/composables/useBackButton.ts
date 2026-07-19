import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { App } from '@capacitor/app'
import type { PluginListenerHandle } from '@capacitor/core'

export function useBackButton() {
  const router = useRouter()
  let backListener: PluginListenerHandle | null = null

  const handleBack = async () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      await App.exitApp()
    }
  }

  onMounted(async () => {
    backListener = await App.addListener('backButton', handleBack)
  })

  onUnmounted(() => {
    if (backListener) {
      backListener.remove()
    }
  })

  return { handleBack }
}
