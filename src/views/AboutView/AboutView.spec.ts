import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from './AboutView.vue'
import { Default } from './AboutView.stories'

describe('AboutView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AboutView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('about-view')
  })
})
