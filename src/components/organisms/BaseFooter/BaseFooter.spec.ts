import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseFooter from './BaseFooter.vue'
import { Default } from './BaseFooter.stories'

describe('BaseFooter', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(BaseFooter, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain(
      'Site footer with copyright, navigation links, and social media contacts',
    )
  })
})
