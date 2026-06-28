import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseFooter from './BaseFooter.vue'

const meta: Meta<typeof BaseFooter> = {
  component: BaseFooter,
  title: 'Components/BaseFooter',
}

export default meta
type Story = StoryObj<typeof BaseFooter>

export const Default: Story = {
  args: {},
}
