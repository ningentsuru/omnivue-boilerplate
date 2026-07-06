import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MobileGeolocationFeature from './MobileGeolocationFeature.vue'

const meta: Meta<typeof MobileGeolocationFeature> = {
  component: MobileGeolocationFeature,
  title: 'Components/MobileGeolocationFeature',
}

export default meta
type Story = StoryObj<typeof MobileGeolocationFeature>

export const Default: Story = {
  args: {},
}
