import { Capacitor } from '@capacitor/core'
import { computed } from 'vue'

// Tauri detection helper (Works for Tauri v1 & v2)
// In v2, __TAURI__ is only present if withGlobalTauri is true,
// so __TAURI_INTERNALS__ is the most reliable check.
const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

export function usePlatform() {
  // 1. Detect Capacitor Platform ('ios', 'android', or 'web')
  const capacitorPlatform = Capacitor.getPlatform()
  const isCapacitorNative = Capacitor.isNativePlatform()

  // 2. Determine Final Platform
  // Priority: Tauri > Capacitor > Web
  let platform: 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'web' = 'web'
  let isNative = false

  if (isTauri) {
    isNative = true
    // Tauri doesn't have a direct 'getPlatform' that returns 'ios/android' simply.
    // We rely on User Agent or Tauri API for specific OS if needed.
    // For now, we distinguish Desktop vs Mobile Tauri via touch points.
    const isTouch = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0

    // Basic OS detection for Tauri via User Agent (more reliable than navigator.platform in some cases)
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes('win')) platform = 'windows'
    else if (ua.includes('mac')) platform = 'macos'
    else if (ua.includes('linux') && !ua.includes('android')) platform = 'linux'
    else if (ua.includes('android')) platform = 'android'
    else if (ua.includes('iphone') || ua.includes('ipad')) platform = 'ios'
    else platform = 'linux' // Fallback
  } else if (isCapacitorNative) {
    isNative = true
    platform = capacitorPlatform as 'ios' | 'android'
  } else {
    isNative = false
    platform = 'web'
  }

  // 3. Compute Helpers
  const isMobile = computed(
    () => platform === 'ios' || platform === 'android' || (isTauri && navigator.maxTouchPoints > 0),
  )

  const isDesktop = computed(
    () =>
      !isMobile.value && (platform === 'windows' || platform === 'macos' || platform === 'linux'),
  )

  return {
    /** Raw platform string: 'ios', 'android', 'windows', 'macos', 'linux', or 'web' */
    platform,

    /** True if running as a native app (Capacitor OR Tauri) */
    isNative,

    /** True if specifically running as a Tauri app */
    isTauri,

    /** True if specifically running as a Capacitor app */
    isCapacitor: isCapacitorNative,

    /** Specific Platform Flags */
    isIOS: computed(() => platform === 'ios'),
    isAndroid: computed(() => platform === 'android'),
    isWindows: computed(() => platform === 'windows'),
    isMacOS: computed(() => platform === 'macos'),
    isLinux: computed(() => platform === 'linux'),
    isWeb: computed(() => platform === 'web'),

    /** Form Factor Flags */
    isMobile,
    isDesktop,
  }
}
