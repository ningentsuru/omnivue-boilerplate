import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DashboardView from './DashboardView.vue'
import { Default } from './DashboardView.stories'

describe('DashboardView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly using Storybook args', () => {
    const wrapper = mount(DashboardView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('dashboard-view')
  })
})
