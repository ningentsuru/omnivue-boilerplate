import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobilePhotoFeature from './MobilePhotoFeature.vue'
import { Default } from './MobilePhotoFeature.stories'

describe('MobilePhotoFeature', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MobilePhotoFeature, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('mobile-photo-feature')
  })
})
