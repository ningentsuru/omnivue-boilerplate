import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileFooter from './MobileFooter.vue'
import { Default } from './MobileFooter.stories'

describe('MobileFooter', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MobileFooter, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('mobile-footer')
  })
})
