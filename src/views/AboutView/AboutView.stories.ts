import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AboutView from './AboutView.vue'

const meta: Meta<typeof AboutView> = {
  component: AboutView,
  title: 'Components/AboutView',
}

export default meta
type Story = StoryObj<typeof AboutView>

export const Default: Story = {
  args: {},
}
