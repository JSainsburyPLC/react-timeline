import React from 'react'
import { shallow } from 'enzyme'

import Tracks from '..'
import Track from '../Track'

describe('<Tracks />', () => {
  it('renders <Track /> components', () => {
    const props = {
      time: {},
      tracks: [{ id: '1', elements: [] }, { id: '2', elements: [] }],
    }
    const wrapper = shallow(<Tracks {...props} />)
    expect(wrapper.find(Track)).toHaveLength(2)
  })
})
