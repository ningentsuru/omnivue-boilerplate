import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MobileLayout from './MobileLayout.vue'

const meta: Meta<typeof MobileLayout> = {
  component: MobileLayout,
  title: 'Components/MobileLayout',
}

export default meta
type Story = StoryObj<typeof MobileLayout>

export const Default: Story = {
  args: {},
}
