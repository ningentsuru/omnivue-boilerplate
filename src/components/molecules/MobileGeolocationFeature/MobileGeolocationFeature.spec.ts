import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileGeolocationFeature from './MobileGeolocationFeature.vue'
import { Default } from './MobileGeolocationFeature.stories'

describe('MobileGeolocationFeature', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MobileGeolocationFeature, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('mobile-geolocation-feature')
  })
})
