import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from './LoginView.vue'
import { Default } from './LoginView.stories'

describe('LoginView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(LoginView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('login-signup-form')
  })
})
