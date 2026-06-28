import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ThemeToggle from './ThemeToggle.vue'

const meta: Meta<typeof ThemeToggle> = {
  component: ThemeToggle,
  title: 'Components/ThemeToggle',
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {
  args: {},
}
