import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppHeader from './AppHeader.vue'

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  title: 'Components/AppHeader',
}

export default meta
type Story = StoryObj<typeof AppHeader>

export const Default: Story = {
  args: {},
}
