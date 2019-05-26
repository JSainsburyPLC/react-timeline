import React from 'react'
import { shallow } from 'enzyme'

import Cell from '../Cell'
import createTime from '../../../../utils/time'

describe('<Cell />', () => {
  const props = {
    time: createTime({
      start: new Date('2016-01-01'),
      end: new Date('2019-01-01'),
      zoom: 1,
    }),
    title: 'test',
    start: new Date('2017-01-01'),
    end: new Date('2018-01-01'),
  }

  it('renders the "title"', () => {
    const wrapper = shallow(<Cell {...props} />)
    expect(wrapper.text()).toBe('test')
  })

  it('renders with a calculated width and left position based on "start" and "end"', () => {
    const wrapper = shallow(<Cell {...props} />)
    expect(wrapper.prop('style')).toEqual({
      left: '366px',
      width: '365px',
    })
  })
})
