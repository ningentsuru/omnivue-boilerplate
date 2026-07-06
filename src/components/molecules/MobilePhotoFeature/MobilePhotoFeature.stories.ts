import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MobilePhotoFeature from './MobilePhotoFeature.vue'

const meta: Meta<typeof MobilePhotoFeature> = {
  component: MobilePhotoFeature,
  title: 'Components/MobilePhotoFeature',
}

export default meta
type Story = StoryObj<typeof MobilePhotoFeature>

export const Default: Story = {
  args: {},
}
