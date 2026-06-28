import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LoginSignupForm from './LoginSignupForm.vue'

const meta: Meta<typeof LoginSignupForm> = {
  component: LoginSignupForm,
  title: 'Components/LoginSignupForm',
}

export default meta
type Story = StoryObj<typeof LoginSignupForm>

export const Default: Story = {
  args: {
    isLogin: false,
  },
}
