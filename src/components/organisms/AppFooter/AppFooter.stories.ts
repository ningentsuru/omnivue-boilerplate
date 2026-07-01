import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppFooter from './AppFooter.vue'

const meta: Meta<typeof AppFooter> = {
  component: AppFooter,
  title: 'Components/AppFooter',
}

export default meta
type Story = StoryObj<typeof AppFooter>

export const Default: Story = {
  args: {},
}
