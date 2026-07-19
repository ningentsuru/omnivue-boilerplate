import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismDesktopHeader from './OrganismDesktopHeader.vue'

const meta: Meta<typeof OrganismDesktopHeader> = {
  component: OrganismDesktopHeader,
  title: 'Components/OrganismDesktopHeader',
}

export default meta
type Story = StoryObj<typeof OrganismDesktopHeader>

export const Default: Story = {
  args: {},
}
