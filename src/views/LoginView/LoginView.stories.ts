import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LoginView from './LoginView.vue'

const meta: Meta<typeof LoginView> = {
  component: LoginView,
  title: 'Components/LoginView',
}

export default meta
type Story = StoryObj<typeof LoginView>

export const Default: Story = {
  args: {},
}
