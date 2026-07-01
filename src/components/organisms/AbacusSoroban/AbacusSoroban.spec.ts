import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AbacusSoroban from './AbacusSoroban.vue'
import { Default } from './AbacusSoroban.stories'
interface defaultProps {
  count: number
}

describe('AbacusSoroban', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(AbacusSoroban, {
      props: Default.args as defaultProps,
    })

    expect(wrapper.text()).toContain('abacus-soroban')
  })

  it('receives correct props from Storybook args', () => {
    const wrapper = mount(AbacusSoroban, {
      props: Default.args as defaultProps,
    })


    // Verify count (number)
    expect(wrapper.props('count')).toEqual(0)
  })
})
