import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ErrorLayout from './ErrorLayout.vue'

const meta: Meta<typeof ErrorLayout> = {
  component: ErrorLayout,
  title: 'Components/ErrorLayout',
}

export default meta
type Story = StoryObj<typeof ErrorLayout>

export const Default: Story = {
  args: {},
}
