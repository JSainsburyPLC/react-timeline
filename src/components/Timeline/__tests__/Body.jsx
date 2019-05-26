import React from 'react'
import { shallow } from 'enzyme'

import Body from '../Body'
import Tracks from '../Tracks'
import Grid from '../Grid'

const defaultProps = {
  time: {},
  grid: [],
  tracks: [],
}

describe('<Body />', () => {
  it('renders <Tracks />', () => {
    const wrapper = shallow(<Body {...defaultProps} />)
    expect(wrapper.find(Tracks).exists()).toBe(true)
  })

  it('renders <Grid /> if grid prop exists', () => {
    const wrapper = shallow(<Body {...defaultProps} />)
    expect(wrapper.find(Grid).exists()).toBe(true)
  })

  it('does not render <Grid /> if grid prop does not exist', () => {
    const props = {
      ...defaultProps,
      grid: undefined,
    }
    const wrapper = shallow(<Body {...props} />)
    expect(wrapper.find(Grid).exists()).toBe(false)
  })
})
