import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TemplateMobile from './TemplateMobile.vue'
import { Default } from './TemplateMobile.stories'


describe('TemplateMobile', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(TemplateMobile, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('template-mobile')
  })
})
