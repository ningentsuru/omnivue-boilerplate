import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismWebHeader from './OrganismWebHeader.vue'
import { Default } from './OrganismWebHeader.stories'


describe('OrganismWebHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismWebHeader, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-web-header')
  })
})
