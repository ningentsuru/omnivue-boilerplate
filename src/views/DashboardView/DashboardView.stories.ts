import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DashboardView from './DashboardView.vue'

const meta: Meta<typeof DashboardView> = {
  component: DashboardView,
  title: 'Components/DashboardView',
}

export default meta
type Story = StoryObj<typeof DashboardView>

export const Default: Story = {
  args: {},
}
