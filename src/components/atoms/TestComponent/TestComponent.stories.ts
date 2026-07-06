import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TestComponent from './TestComponent.vue'

const meta: Meta<typeof TestComponent> = {
  component: TestComponent,
  title: 'Components/TestComponent',
}

export default meta
type Story = StoryObj<typeof TestComponent>

export const Default: Story = {
  args: {
    string: '',
  },
}
