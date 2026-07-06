import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileFeaturesView from './MobileFeaturesView.vue'
import { Default } from './MobileFeaturesView.stories'

describe('MobileFeaturesView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MobileFeaturesView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('mobile-features-view')
  })
})
