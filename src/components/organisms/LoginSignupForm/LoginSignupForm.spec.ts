import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginSignupForm from './LoginSignupForm.vue'
import { Default } from './LoginSignupForm.stories'
interface defaultProps {
  isLogin: boolean
}

describe('LoginSignupForm', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(LoginSignupForm, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('login-signup-form')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(LoginSignupForm, {
      props: Default.args as defaultProps,
    })

    // Verify isLogin (boolean)
    expect(wrapper.props('isLogin')).toEqual(false)
  })
})
