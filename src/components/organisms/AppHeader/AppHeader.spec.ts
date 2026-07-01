import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from './AppHeader.vue'
import { Default } from './AppHeader.stories'

describe('AppHeader', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AppHeader, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain(
      'Main site header with logo, primary navigation, and theme toggle',
    )
  })
})
