import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileFileSystemFeature from './MobileFileSystemFeature.vue'
import { Default } from './MobileFileSystemFeature.stories'

describe('MobileFileSystemFeature', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(MobileFileSystemFeature, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('mobile-file-system-feature')
  })
})
