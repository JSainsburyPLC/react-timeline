import React from 'react'
import { shallow } from 'enzyme'

import Sidebar from '..'
import Header from '../Header'
import Body from '../Body'

describe('<Sidebar />', () => {
  it('renders <Header /> and <Body />', () => {
    const props = {
      timebar: [],
      tracks: [{}],
      toggleTrackOpen: jest.fn(),
    }
    const wrapper = shallow(<Sidebar {...props} />)
    expect(wrapper.find(Header).exists()).toBe(true)
    expect(wrapper.find(Body).exists()).toBe(true)
  })
})
