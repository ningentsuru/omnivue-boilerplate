import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismMobileHeader from './OrganismMobileHeader.vue'

const meta: Meta<typeof OrganismMobileHeader> = {
  component: OrganismMobileHeader,
  title: 'Components/OrganismMobileHeader',
}

export default meta
type Story = StoryObj<typeof OrganismMobileHeader>

export const Default: Story = {
  args: {},
}
