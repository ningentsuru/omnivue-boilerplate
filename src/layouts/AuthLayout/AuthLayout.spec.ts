import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AuthLayout from './AuthLayout.vue'
import { Default } from './AuthLayout.stories'

describe('AuthLayout', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AuthLayout, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('auth-layout')
  })
})
