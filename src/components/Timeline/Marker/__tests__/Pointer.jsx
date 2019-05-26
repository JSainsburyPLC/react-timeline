import React from 'react'
import { shallow } from 'enzyme'

import PointerMarker from '../Pointer'
import Marker from '..'
import createTime from '../../../../utils/time'

const time = createTime({
  start: new Date('2017-01-01'),
  end: new Date('2018-01-01'),
  zoom: 1,
})

describe('<PointerMarker />', () => {
  const props = {
    time,
    date: new Date('2017-01-02'),
    visible: false,
    highlighted: false,
  }

  it('renders <Marker /> passing down horizontal position', () => {
    const wrapper = shallow(<PointerMarker {...props} />)
    expect(wrapper.find(Marker).prop('x')).toBe(1)
  })

  it('renders "text"', () => {
    const wrapper = shallow(<PointerMarker {...props} />)
    expect(wrapper.find('strong').text()).toBe('2 Jan')
  })
})
