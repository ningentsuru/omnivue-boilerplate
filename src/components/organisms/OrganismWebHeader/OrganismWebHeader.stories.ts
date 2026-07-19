import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismWebHeader from './OrganismWebHeader.vue'

const meta: Meta<typeof OrganismWebHeader> = {
  component: OrganismWebHeader,
  title: 'Components/OrganismWebHeader',
}

export default meta
type Story = StoryObj<typeof OrganismWebHeader>

export const Default: Story = {
  args: {},
}
