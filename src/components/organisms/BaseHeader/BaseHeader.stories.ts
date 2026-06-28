import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseHeader from './BaseHeader.vue'

const meta: Meta<typeof BaseHeader> = {
  component: BaseHeader,
  title: 'Components/BaseHeader',
}

export default meta
type Story = StoryObj<typeof BaseHeader>

export const Default: Story = {
  args: {},
}
