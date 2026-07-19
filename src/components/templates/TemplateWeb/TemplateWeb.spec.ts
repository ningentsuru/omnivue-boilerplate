import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TemplateWeb from './TemplateWeb.vue'
import { Default } from './TemplateWeb.stories'


describe('TemplateWeb', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(TemplateWeb, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('template-web')
  })
})
