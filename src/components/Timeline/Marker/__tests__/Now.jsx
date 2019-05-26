import React from 'react'
import { shallow } from 'enzyme'

import NowMarker from '../Now'
import Marker from '..'
import createTime from '../../../../utils/time'

const createProps = ({
  now = new Date(),
  time = createTime({
    start: new Date(),
    end: new Date(),
    zoom: 1,
  }),
  visible = true,
}) => ({ now, time, visible })

describe('<NowMarker />', () => {
  it('renders <Marker /> whose position is calculated from the time', () => {
    const props = createProps({
      now: new Date('2017-01-01'),
      time: createTime({
        start: new Date('2016-01-01'),
        end: new Date('2018-01-10'),
        zoom: 1,
      }),
    })
    const wrapper = shallow(<NowMarker {...props} />)
    expect(wrapper.find(Marker).prop('x')).toBe(366)
  })

  it('renders the formatted date for "now"', () => {
    const props = createProps({
      now: new Date('2017-04-10'),
    })
    const wrapper = shallow(<NowMarker {...props} />)
    expect(wrapper.find('strong').text()).toBe('10 Apr')
  })
})
