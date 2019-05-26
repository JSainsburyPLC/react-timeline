import React from 'react'
import { shallow } from 'enzyme'

import Track from '../Track'
import Tracks from '..'
import Element from '../Element'

const createProps = ({
  time = {},
  elements = [],
  isOpen = false,
  tracks = []
}) => ({
  time, elements, isOpen, tracks
})

describe('<Track />', () => {
  it('filters out <Element /> components where "start" is after "end"', () => {
    const props = createProps({
      elements: [
        {
          id: '1',
          start: new Date('2017-01-01'),
          end: new Date('2018-01-01')
        }, {
          id: '2',
          start: new Date('2018-01-01'),
          end: new Date('2017-01-01')
        }
      ]
    })
    const wrapper = shallow(<Track {...props} />)
    expect(wrapper.find(Element)).toHaveLength(1)
  })

  it('renders <Tracks /> if is open and tracks exist', () => {
    const props = createProps({
      isOpen: true,
      tracks: [{}]
    })
    const wrapper = shallow(<Track {...props} />)
    expect(wrapper.find(Tracks)).toHaveLength(1)
  })

  it('does not render <Tracks /> is is not open', () => {
    const props = createProps({
      isOpen: false,
      tracks: [{}]
    })
    const wrapper = shallow(<Track {...props} />)
    expect(wrapper.find(Tracks)).toHaveLength(0)
  })

  it('does not render <Tracks /> if there are no tracks', () => {
    const props = createProps({
      isOpen: true,
      tracks: []
    })
    const wrapper = shallow(<Track {...props} />)
    expect(wrapper.find(Tracks)).toHaveLength(0)
  })
})
