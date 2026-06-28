import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LandingView from './LandingView.vue'
import { Default } from './LandingView.stories'

describe('LandingView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(LandingView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('landing-view')
  })
})
