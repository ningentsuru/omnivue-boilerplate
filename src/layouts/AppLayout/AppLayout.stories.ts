import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { vueRouter } from 'storybook-vue3-router'
import AppLayout from './AppLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: { template: '<div>Home</div>' },
    meta: { layout: 'DefaultLayout' },
  },
] as unknown as RouteRecordRaw[]

const meta = {
  title: 'Layouts/AppLayout',
  component: AppLayout,
  decorators: [vueRouter(routes, { initialRoute: '/' })],
  args: {},
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
