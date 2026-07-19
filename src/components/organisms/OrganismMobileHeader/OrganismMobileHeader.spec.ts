import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismMobileHeader from './OrganismMobileHeader.vue'
import { Default } from './OrganismMobileHeader.stories'


describe('OrganismMobileHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismMobileHeader, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-mobile-header')
  })
})
