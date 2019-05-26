import React from 'react'
import { shallow } from 'enzyme'

import TrackKeys from '..'
import TrackKey from '../TrackKey'

describe('<TrackKeys />', () => {
  it('renders a <TrackKey /> for each track', () => {
    const props = {
      tracks: [
        {
          id: '1',
          title: 'Track 1',
        },
        {
          id: '2',
          title: 'Track 2',
        },
      ],
      toggleOpen: jest.fn(),
    }
    const wrapper = shallow(<TrackKeys {...props} />)
    expect(wrapper.find(TrackKey)).toHaveLength(2)
  })
})
