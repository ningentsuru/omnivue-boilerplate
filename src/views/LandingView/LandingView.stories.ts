import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LandingView from './LandingView.vue'

const meta: Meta<typeof LandingView> = {
  component: LandingView,
  title: 'Components/LandingView',
}

export default meta
type Story = StoryObj<typeof LandingView>

export const Default: Story = {
  args: {},
}
