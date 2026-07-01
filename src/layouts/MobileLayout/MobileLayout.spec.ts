import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileLayout from './MobileLayout.vue'
import { Default } from './MobileLayout.stories'

describe('MobileLayout', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MobileLayout, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('mobile-layout')
  })
})
