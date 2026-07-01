import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileHeader from './MobileHeader.vue'
import { Default } from './MobileHeader.stories'

describe('MobileHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MobileHeader, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('mobile-header')
  })
})
