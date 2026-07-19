import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismDesktopHeader from './OrganismDesktopHeader.vue'
import { Default } from './OrganismDesktopHeader.stories'


describe('OrganismDesktopHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismDesktopHeader, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-desktop-header')
  })
})
