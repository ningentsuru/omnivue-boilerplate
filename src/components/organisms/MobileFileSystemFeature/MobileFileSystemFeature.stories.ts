import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MobileFileSystemFeature from './MobileFileSystemFeature.vue'

const meta: Meta<typeof MobileFileSystemFeature> = {
  component: MobileFileSystemFeature,
  title: 'Components/MobileFileSystemFeature',
}

export default meta
type Story = StoryObj<typeof MobileFileSystemFeature>

export const Default: Story = {
  args: {},
}
