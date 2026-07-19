import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TemplateWeb from './TemplateWeb.vue'

const meta: Meta<typeof TemplateWeb> = {
  component: TemplateWeb,
  title: 'Components/TemplateWeb',
}

export default meta
type Story = StoryObj<typeof TemplateWeb>

export const Default: Story = {
  args: {},
}
