import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export interface User {
  id: number
  email: string
  name: string
}

const storedUser = localStorage.getItem('mock_user')
const currentUser = ref<User | null>(storedUser ? JSON.parse(storedUser) : null)

export function useAuth() {
  const router = useRouter()
  const isAuthenticated = computed(() => !!currentUser.value)
  const user = computed(() => currentUser.value)

  const login = (email: string) => {
    const mockUser: User = {
      id: 1,
      email: email,
      name: email.split('@')[0] ?? '',
    }

    currentUser.value = mockUser

    localStorage.setItem('mock_user', JSON.stringify(mockUser))
    localStorage.setItem('mock_auth_token', 'true')
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('mock_user')
    localStorage.removeItem('mock_auth_token')

    router.push({ name: 'landing' })
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
}
