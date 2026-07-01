import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AbacusSoroban from './AbacusSoroban.vue'

const meta: Meta<typeof AbacusSoroban> = {
  component: AbacusSoroban,
  title: 'Components/AbacusSoroban',
}

export default meta
type Story = StoryObj<typeof AbacusSoroban>

export const Default: Story = {
  args: {
    count: 0,
  },
}
