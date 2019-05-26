import React from 'react'
import { shallow } from 'enzyme'

import Element from '../Element'
import BasicElement from '../../../Elements/Basic'
import createTime from '../../../../utils/time'

describe('<Element />', () => {
  const defaultProps = {
    id: '1',
    time: createTime({
      start: new Date('2016-01-01'),
      end: new Date('2019-01-01'),
      zoom: 1,
    }),
    title: 'test',
    start: new Date('2017-01-01'),
    end: new Date('2018-01-01'),
  }

  it('renders with a calculated width and left position based on "start" and "end"', () => {
    const wrapper = shallow(<Element {...defaultProps} />)
    expect(wrapper.prop('style')).toEqual({
      left: '366px',
      width: '365px',
    })
  })

  it('renders <BasicElement />', () => {
    const wrapper = shallow(<Element {...defaultProps} />)
    expect(wrapper.find(BasicElement).exists()).toBe(true)
  })

  describe('clickElement', () => {
    it('renders with a cursor pointer style if callback is passed', () => {
      const props = { ...defaultProps }
      const wrapper = shallow(<Element {...props} clickElement={jest.fn()} />)
      expect(wrapper.prop('style')).toMatchObject({ cursor: 'pointer' })
    })

    it('renders without cursor pointer style if callback is not passed', () => {
      const wrapper = shallow(<Element {...defaultProps} />)
      expect(wrapper.prop('style')).not.toMatchObject({ cursor: 'pointer' })
    })

    it('gets called with props when clicked', () => {
      const clickElement = jest.fn()
      const props = { ...defaultProps, clickElement }
      const wrapper = shallow(<Element {...props} clickElement={clickElement} />)
      expect(clickElement).toHaveBeenCalledTimes(0)

      wrapper.simulate('click')
      expect(clickElement).toHaveBeenCalledTimes(1)
      expect(clickElement).toHaveBeenCalledWith(props)
    })
  })
})
