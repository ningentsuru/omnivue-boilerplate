import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TemplateMobile from './TemplateMobile.vue'

const meta: Meta<typeof TemplateMobile> = {
  component: TemplateMobile,
  title: 'Components/TemplateMobile',
}

export default meta
type Story = StoryObj<typeof TemplateMobile>

export const Default: Story = {
  args: {},
}
