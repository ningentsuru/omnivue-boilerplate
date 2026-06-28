import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FloatingHeader from './FloatingHeader.vue'

const meta: Meta<typeof FloatingHeader> = {
  component: FloatingHeader,
  title: 'Components/FloatingHeader',
}

export default meta
type Story = StoryObj<typeof FloatingHeader>

export const Default: Story = {
  args: {},
}
