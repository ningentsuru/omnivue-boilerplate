import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TemplateDesktop from './TemplateDesktop.vue'
import { Default } from './TemplateDesktop.stories'


describe('TemplateDesktop', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(TemplateDesktop, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('template-desktop')
  })
})
