import { loadEnv } from 'vite'

export function getProxyConfig(mode: string) {
  const env = loadEnv(mode, process.cwd(), '')

  const baseUrl = env.VITE_OPENWEATHER_URL

  return {
    '/api/weather': {
      target: `${baseUrl}`,
      changeOrigin: true,
      rewrite: (path: string) => {
        const cleanPath = path.replace(/^\/api\/weather/, '')
        const separator = cleanPath.includes('?') ? '&' : '?'
        return `${cleanPath}${separator}appid=${env.VITE_OPENWEATHER_API_KEY}`
      },
    },
  }
}
