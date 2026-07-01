import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from './AppFooter.vue'
import { Default } from './AppFooter.stories'

describe('AppFooter', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AppFooter, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain(
      'Site footer with copyright, navigation links, and social media contacts',
    )
  })
})
