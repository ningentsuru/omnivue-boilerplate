import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppLogo from './AppLogo.vue'

const meta: Meta<typeof AppLogo> = {
  component: AppLogo,
  title: 'Components/AppLogo',
}

export default meta
type Story = StoryObj<typeof AppLogo>

export const Default: Story = {
  args: {
    brandName: '',
    link: '',
  },
}
