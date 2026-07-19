import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrganismGetCurrentWeather from './OrganismGetCurrentWeather.vue'

const meta: Meta<typeof OrganismGetCurrentWeather> = {
  component: OrganismGetCurrentWeather,
  title: 'Components/OrganismGetCurrentWeather',
}

export default meta
type Story = StoryObj<typeof OrganismGetCurrentWeather>

export const Default: Story = {
  args: {},
}
