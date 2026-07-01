import { SystemBars, SystemBarsStyle } from '@capacitor/core'
import { useDark } from '@vueuse/core'

export async function setupStatusBar() {
  const isDark = useDark()

  const style: SystemBarsStyle = isDark.value ? SystemBarsStyle.Dark : SystemBarsStyle.Light

  await SystemBars.setStyle({ style })
}
