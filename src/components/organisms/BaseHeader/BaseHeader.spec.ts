import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseHeader from './BaseHeader.vue'
import { Default } from './BaseHeader.stories'

describe('BaseHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(BaseHeader, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain(
      'Main site header with logo, primary navigation, and theme toggle',
    )
  })
})
