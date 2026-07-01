import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReadMeView from './ReadMeView.vue'
import { Default } from './ReadMeView.stories'

describe('ReadMeView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(ReadMeView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('read-me-view')
  })
})
