import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MobileFooter from './MobileFooter.vue'

const meta: Meta<typeof MobileFooter> = {
  component: MobileFooter,
  title: 'Components/MobileFooter',
}

export default meta
type Story = StoryObj<typeof MobileFooter>

export const Default: Story = {
  args: {},
}
