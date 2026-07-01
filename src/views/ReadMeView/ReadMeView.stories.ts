import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ReadMeView from './ReadMeView.vue'

const meta: Meta<typeof ReadMeView> = {
  component: ReadMeView,
  title: 'Components/ReadMeView',
}

export default meta
type Story = StoryObj<typeof ReadMeView>

export const Default: Story = {
  args: {},
}
