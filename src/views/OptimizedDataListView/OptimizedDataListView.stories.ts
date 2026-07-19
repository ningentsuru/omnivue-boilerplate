import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OptimizedDataListView from './OptimizedDataListView.vue'

const meta: Meta<typeof OptimizedDataListView> = {
  component: OptimizedDataListView,
  title: 'Components/OptimizedDataListView',
}

export default meta
type Story = StoryObj<typeof OptimizedDataListView>

export const Default: Story = {
  args: {},
}
