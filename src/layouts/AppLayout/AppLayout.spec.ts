import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from './AppLayout.vue'
import { Default } from './AppLayout.stories'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' }, meta: { layout: 'DefaultLayout' } },
  ],
})

describe('AppLayout', () => {
  it('renders properly using Storybook args', async () => {
    const wrapper = mount(AppLayout, {
      props: Default.args,
      global: {
        plugins: [router],
      },
    })

    await router.isReady()
    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
  })
})
