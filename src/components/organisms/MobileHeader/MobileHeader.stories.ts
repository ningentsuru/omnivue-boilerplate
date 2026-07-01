import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MobileHeader from './MobileHeader.vue'

const meta: Meta<typeof MobileHeader> = {
  component: MobileHeader,
  title: 'Components/MobileHeader',
}

export default meta
type Story = StoryObj<typeof MobileHeader>

export const Default: Story = {
  args: {},
}
