import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrganismGetCurrentWeather from './OrganismGetCurrentWeather.vue'
import { Default } from './OrganismGetCurrentWeather.stories'


describe('OrganismGetCurrentWeather', () => {
  it('renders properly using Storybook args', () => {
    const wrapper = mount(OrganismGetCurrentWeather, {
      props: Default.args,
    })

    expect(wrapper.text()).toContain('organism-get-current-weather')
  })
})
