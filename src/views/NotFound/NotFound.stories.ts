import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NotFound from './NotFound.vue'

const meta: Meta<typeof NotFound> = {
  component: NotFound,
  title: 'Components/NotFound',
}

export default meta
type Story = StoryObj<typeof NotFound>

export const Default: Story = {
  args: {},
}
