import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TemplateDesktop from './TemplateDesktop.vue'

const meta: Meta<typeof TemplateDesktop> = {
  component: TemplateDesktop,
  title: 'Components/TemplateDesktop',
}

export default meta
type Story = StoryObj<typeof TemplateDesktop>

export const Default: Story = {
  args: {},
}
