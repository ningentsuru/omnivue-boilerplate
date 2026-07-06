import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TestComponent from './TestComponent.vue'
import { Default } from './TestComponent.stories'
interface defaultProps {
  string: string
}

describe('TestComponent', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(TestComponent, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('test-component')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(TestComponent, {
      props: Default.args as defaultProps,
    })


    // Verify string (string)
    expect(wrapper.props('string')).toEqual('')
  })
})
