import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLogo from './AppLogo.vue'
import { Default } from './AppLogo.stories'
interface defaultProps {
  brandName: string, 
  link: string
}

describe('AppLogo', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AppLogo, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('app-logo')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AppLogo, {
      props: Default.args as defaultProps,
    })


    // Verify brandName (string)
    expect(wrapper.props('brandName')).toEqual('')
    // Verify link (string)
    expect(wrapper.props('link')).toEqual('')
  })
})
