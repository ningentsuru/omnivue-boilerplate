import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomThemeToggle from './AtomThemeToggle.vue'
import { Default } from './AtomThemeToggle.stories'


describe('AtomThemeToggle', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AtomThemeToggle, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('atom-theme-toggle')
  })
})
