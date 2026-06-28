import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SignupView from './SignupView.vue'
import { Default } from './SignupView.stories'

describe('SignupView', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(SignupView, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('login-signup-form')
  })
})
