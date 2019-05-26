import React from 'react'
import { shallow } from 'enzyme'

import Body from '../Body'
import TrackKeys from '../TrackKeys'

describe('<Body />', () => {
  it('renders <TrackKeys />', () => {
    const props = {
      tracks: [{}],
      toggleTrackOpen: jest.fn(),
    }
    const wrapper = shallow(<Body {...props} />)
    expect(wrapper.find(TrackKeys).exists()).toBe(true)
  })
})
