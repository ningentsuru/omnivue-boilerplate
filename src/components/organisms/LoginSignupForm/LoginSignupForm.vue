<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

const email = ref('')
const name = ref('')
const password = ref('')
const error = ref('')

interface Props {
  isLogin?: boolean
}
withDefaults(defineProps<Props>(), {
  isLogin: false,
})

const loginLabel = (isLogin: boolean) => {
  return isLogin ? 'Login' : 'Sign up'
}

const normalizeLink = (link: string) => {
  return link.replace(' ', '').toLocaleLowerCase()
}

const handleLogin = () => {
  if (email.value && password.value) {
    login(email.value)

    const redirectPath = (route.query.redirect as string) || '/dashboard'
    router.push(redirectPath)
  } else {
    error.value = 'Please enter any email and password.'
  }
}
</script>

<template>
  <div class="login-signup-form">
    <Card class="w-full max-w-sm">
      <form @submit.prevent="handleLogin">
        <CardHeader class="relative">
          <CardTitle>{{ loginLabel(isLogin) }} to your account</CardTitle>
          <CardDescription> Enter your email below to login to your account </CardDescription>
          <Button
            type="button"
            class="absolute top-4 right-2 cursor-pointer"
            variant="outline"
            size="sm"
            asChild
          >
            <router-link :to="normalizeLink(loginLabel(!isLogin))">
              {{ loginLabel(!isLogin) }} here!
            </router-link>
          </Button>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                v-model="email"
                placeholder="john.doe@github.com"
                required
              />
            </div>
            <div v-if="!isLogin" class="flex flex-col space-y-1.5">
              <Label for="fullname">Fullname</Label>
              <Input id="fullname" type="text" v-model="name" placeholder="john doe" required />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
              <Input id="password" type="password" v-model="password" required />
              <router-link to="/forgot-password" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </router-link>
            </div>
            <p v-if="error" class="text-red-500">{{ error }}</p>
          </div>
        </CardContent>
        <CardFooter class="flex flex-col gap-2">
          <Button type="submit" class="w-full cursor-pointer"> {{ loginLabel(isLogin) }} </Button>
          <Button type="button" variant="outline" class="w-full cursor-pointer">
            {{ loginLabel(isLogin) }} with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
    <span class="sr-only">login-signup-form</span>
  </div>
</template>
