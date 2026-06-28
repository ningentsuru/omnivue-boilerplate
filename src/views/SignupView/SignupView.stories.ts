import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SignupView from './SignupView.vue'

const meta: Meta<typeof SignupView> = {
  component: SignupView,
  title: 'Components/SignupView',
}

export default meta
type Story = StoryObj<typeof SignupView>

export const Default: Story = {
  args: {},
}
