import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFound from './NotFound.vue'
import { Default } from './NotFound.stories'

describe('NotFound', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(NotFound, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('not-found')
  })
})
