import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FloatingHeader from './FloatingHeader.vue'
import { Default } from './FloatingHeader.stories'

describe('FloatingHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(FloatingHeader, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('floating-header')
  })
})
