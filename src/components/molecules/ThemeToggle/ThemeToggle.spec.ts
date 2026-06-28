import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from './ThemeToggle.vue'
import { Default } from './ThemeToggle.stories'

describe('ThemeToggle', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(ThemeToggle, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('theme-toggle')
  })
})
