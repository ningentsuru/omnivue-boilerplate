import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OptimizedDataListView from './OptimizedDataListView.vue'
import { Default } from './OptimizedDataListView.stories'


describe('OptimizedDataListView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OptimizedDataListView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('optimized-data-list-view')
  })
})
