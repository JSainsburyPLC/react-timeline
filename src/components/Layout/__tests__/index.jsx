import React from 'react'
import { mount } from 'enzyme'

import Layout from '..'
import Sidebar from '../../Sidebar'
import Timeline from '../../Timeline'

import computedStyle from '../../../utils/computedStyle'
import { addListener, removeListener } from '../../../utils/events'
import raf from '../../../utils/raf'

jest.mock('../../Sidebar', () => () => null)
jest.mock('../../Timeline', () => () => null)
jest.mock('../../../utils/computedStyle')
jest.mock('../../../utils/events')
jest.mock('../../../utils/raf')

const createProps = ({
  timebar = [],
  time = {
    fromX: jest.fn(() => new Date()),
    toX: jest.fn(() => 0),
  },
  tracks = [],
  now = new Date(),
  isOpen = false,
  toggleTrackOpen = jest.fn(),
  enableSticky = true,
  onLayoutChange = jest.fn(),
  timelineViewportWidth = 1000,
  sidebarWidth = 200,
} = {}) => ({
  timebar,
  time,
  tracks,
  now,
  isOpen,
  toggleTrackOpen,
  enableSticky,
  onLayoutChange,
  timelineViewportWidth,
  sidebarWidth,
})

describe('<Layout />', () => {
  beforeEach(() => {
    computedStyle.mockImplementation(node => ({
      getPropertyValue(prop) {
        return node.style[prop]
      },
    }))
    raf.mockImplementation(fn => fn())
  })

  it('renders <Sidebar /> and <Timeline />', () => {
    const props = createProps()
    const wrapper = mount(<Layout {...props} />)
    expect(wrapper.find(Sidebar).exists()).toBe(true)
    expect(wrapper.find(Timeline).exists()).toBe(true)
  })

  it('renders <Sidebar /> in an open state', () => {
    const props = createProps({ isOpen: true })
    const wrapper = mount(<Layout {...props} />)
    expect(wrapper.find('.rt-layout').prop('className')).toMatch('is-open')
  })

  it('renders <Sidebar /> in a closed state', () => {
    const props = createProps({ isOpen: false })
    const wrapper = mount(<Layout {...props} />)
    expect(wrapper.find('.rt-layout').prop('className')).not.toMatch('is-open')
  })

  describe('sticky header', () => {
    it('becomes sticky when the window is within the timeline', () => {
      const listeners = {}
      addListener.mockImplementation((evt, fun) => {
        listeners[evt] = fun
      })
      removeListener.mockImplementation(jest.fn())

      const props = createProps()
      const wrapper = mount(<Layout {...props} />)
      expect(typeof listeners.scroll).toEqual('function')

      wrapper.instance().setHeaderHeight(50)
      wrapper.instance().timeline.current.getBoundingClientRect = () => ({
        top: -50,
        bottom: 100,
      })
      listeners.scroll()
      expect(wrapper.state()).toMatchObject({
        isSticky: true,
      })

      wrapper.instance().timeline.current.getBoundingClientRect = () => ({
        top: 10,
        bottom: 100,
      })
      listeners.scroll()
      expect(wrapper.state()).toMatchObject({
        isSticky: false,
      })

      wrapper.instance().timeline.current.getBoundingClientRect = () => ({
        top: -60,
        bottom: 20,
      })
      listeners.scroll()
      expect(wrapper.state()).toMatchObject({
        isSticky: false,
      })

      wrapper.unmount()
      expect(removeListener).toBeCalled()
    })

    it('syncs the timeline scroll position when the header is scrolled and is sticky', () => {
      const props = createProps()
      const wrapper = mount(<Layout {...props} />)
      wrapper.setState({ isSticky: true })
      wrapper
        .find(Timeline)
        .prop('sticky')
        .handleHeaderScrollY('100')
      expect(wrapper.find('.rt-layout__timeline').instance().scrollLeft).toBe(100)
    })
  })
})
