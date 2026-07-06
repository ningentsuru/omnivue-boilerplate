import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MobileFeaturesView from './MobileFeaturesView.vue'

const meta: Meta<typeof MobileFeaturesView> = {
  component: MobileFeaturesView,
  title: 'Components/MobileFeaturesView',
}

export default meta
type Story = StoryObj<typeof MobileFeaturesView>

export const Default: Story = {
  args: {},
}
