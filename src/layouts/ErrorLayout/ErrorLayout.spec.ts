import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorLayout from './ErrorLayout.vue'
import { Default } from './ErrorLayout.stories'

describe('ErrorLayout', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(ErrorLayout, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('error-layout')
  })
})
