import React from 'react'
import { shallow } from 'enzyme'

import Timeline from '..'
import Header from '../Header'
import Body from '../Body'
import NowMarker from '../Marker/Now'
import PointerMarker from '../Marker/Pointer'
import createTime from '../../../utils/time'

import getMouseX from '../../../utils/getMouseX'

jest.mock('../../../utils/getMouseX')

const time = createTime({
  start: new Date('2018-01-01'),
  end: new Date('2019-01-01'),
  zoom: 1,
})

const defaultTimebar = [
  {
    useAsGrid: true,
    id: '1',
    cells: [{ id: 'cell-1' }],
  },
]

const createProps = ({ now = new Date(), timebar = defaultTimebar, tracks = [], isOpen } = {}) => ({
  now,
  time,
  timebar,
  tracks,
  isOpen,
})

describe('<Timeline />', () => {
  it('renders <NowMarker />, <Header /> and <Body />', () => {
    const props = createProps()
    const wrapper = shallow(<Timeline {...props} />)
    expect(wrapper.find(NowMarker).exists()).toBe(true)
    expect(wrapper.find(Header).exists()).toBe(true)
    expect(wrapper.find(Body).exists()).toBe(true)
  })

  it('renders <Body /> passing in appropriate grid cells', () => {
    const props = createProps()
    const wrapper = shallow(<Timeline {...props} />)
    const expected = [{ id: 'cell-1' }]
    expect(wrapper.find(Body).prop('grid')).toEqual(expected)
  })

  describe('markers', () => {
    it('does not render <PointerMarker /> when component mounts', () => {
      const props = createProps()
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.find(PointerMarker).exists()).not.toBe(true)
    })

    it('renders <PointerMarker /> when component mounts', () => {
      const props = createProps()
      const wrapper = shallow(<Timeline {...props} />)
      wrapper.setState({ pointerDate: new Date() })
      expect(wrapper.find(PointerMarker).exists()).toBe(true)
    })

    it('does not render <NowMarker /> if "now" is "null"', () => {
      const props = createProps({ now: null })
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.find(NowMarker).exists()).toBe(false)
    })

    it('updates pointerDate when the mouse moves', () => {
      const event = 10
      const props = createProps()
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.state('pointerDate')).toBe(null)

      getMouseX.mockImplementation(e => e)
      wrapper.find(Header).prop('onMove')(event)
      expect(wrapper.state('pointerDate')).toEqual(new Date('2018-01-11'))
    })

    it('makes the pointer visible and highlighted when the mouse enters', () => {
      const props = createProps()
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.state('pointerVisible')).toBe(false)
      expect(wrapper.state('pointerHighlighted')).toBe(false)

      wrapper.find(Header).prop('onEnter')()
      expect(wrapper.state('pointerVisible')).toBe(true)
      expect(wrapper.state('pointerHighlighted')).toBe(true)
    })

    it('removes the pointer highlight when the mouse leaves', () => {
      const props = createProps()
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.state('pointerHighlighted')).toBe(false)

      wrapper.find(Header).prop('onEnter')()
      expect(wrapper.state('pointerHighlighted')).toBe(true)

      wrapper.find(Header).prop('onLeave')()
      expect(wrapper.state('pointerHighlighted')).toBe(false)
    })
  })
})
