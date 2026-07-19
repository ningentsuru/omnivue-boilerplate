import { ref } from 'vue'
import axios from 'axios'
import { CapacitorHttp, type HttpResponse } from '@capacitor/core'
import { fetch as tauriFetch } from '@tauri-apps/plugin-http'
import { usePlatform } from '@/composables/usePlatform'

const { isMobile, isDesktop } = usePlatform()

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface ApiOptions<TBody = unknown> {
  method?: HttpMethod
  data?: TBody
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
}

interface ApiState<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export function useApi() {
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  /**
   * Universal Request Function
   * @param url - The API endpoint
   * @param options - Request configuration
   * @returns Promise<ApiState<T>> where T is the expected response type
   */
  const request = async <T>(url: string, options: ApiOptions = {}): Promise<ApiState<T>> => {
    loading.value = true
    error.value = null

    const { method = 'GET', data, headers = {}, params } = options

    try {
      let responseData: T

      if (isMobile) {
        let finalUrl = url
        if (params) {
          finalUrl += `?${new URLSearchParams(params as Record<string, string>).toString()}`
        }

        const response: HttpResponse = await CapacitorHttp.request({
          url: finalUrl,
          method,
          headers: { 'Content-Type': 'application/json', ...headers },
          data: data ? JSON.stringify(data) : undefined,
        })

        if (response.status >= 400) {
          throw new Error(`HTTP Error ${response.status}`)
        }

        responseData =
          typeof response.data === 'string'
            ? (JSON.parse(response.data) as T)
            : (response.data as T)
      } else if (isDesktop) {
        const queryString = params
          ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
          : ''
        const finalUrl = url + queryString

        const response = await tauriFetch(finalUrl, {
          method,
          headers: { ...headers },
          body: data ? JSON.stringify(data) : undefined,
        })

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`)
        }

        responseData = await (response.json() as Promise<T>)
      } else {
        const response = await axios<T>({
          url,
          method,
          data,
          headers,
          params,
        })
        responseData = response.data
      }

      return { data: responseData, error: null, loading: false }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'

      error.value = errorMessage
      return { data: null, error: errorMessage, loading: false }
    } finally {
      loading.value = false
    }
  }

  const get = <T>(url: string, params?: Record<string, string | number | boolean>) =>
    request<T>(url, { method: 'GET', params })

  const post = <T, TBody = unknown>(url: string, data?: TBody) =>
    request<T>(url, { method: 'POST', data })

  const put = <T, TBody = unknown>(url: string, data?: TBody) =>
    request<T>(url, { method: 'PUT', data })

  const del = <T>(url: string) => request<T>(url, { method: 'DELETE' })

  return {
    request,
    get,
    post,
    put,
    del,
    loading,
    error,
  }
}
