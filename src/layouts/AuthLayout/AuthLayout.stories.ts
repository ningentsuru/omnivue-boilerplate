import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AuthLayout from './AuthLayout.vue'

const meta: Meta<typeof AuthLayout> = {
  component: AuthLayout,
  title: 'Components/AuthLayout',
}

export default meta
type Story = StoryObj<typeof AuthLayout>

export const Default: Story = {
  args: {},
}
