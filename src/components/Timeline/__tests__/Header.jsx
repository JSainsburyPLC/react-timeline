import React from 'react'
import { shallow, mount } from 'enzyme'

import Header from '../Header'
import Timebar from '../Timebar'

const createStickyProp = ({
  isSticky = false,
  setHeaderHeight = jest.fn(),
  handleHeaderScrollY = jest.fn(),
  headerHeight = 0,
  viewportWidth = 0,
  scrollLeft = 0,
} = {}) => ({
  isSticky,
  setHeaderHeight,
  handleHeaderScrollY,
  headerHeight,
  viewportWidth,
  scrollLeft,
})

const createProps = ({
  time = {},
  timebar = [],
  onMove = jest.fn(),
  onEnter = jest.fn(),
  onLeave = jest.fn(),
  sticky = undefined,
} = {}) => ({
  time,
  timebar,
  onMove,
  onEnter,
  onLeave,
  sticky,
  width: '1000px',
})

describe('<Header />', () => {
  it('renders <Timebar />', () => {
    const props = createProps()
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.find(Timebar).exists()).toBe(true)
  })

  it('calls "onMove" on mouse move event', () => {
    const onMove = jest.fn()
    const props = createProps({ onMove })
    const wrapper = shallow(<Header {...props} />)
    wrapper.simulate('mouseMove')
    expect(onMove).toBeCalled()
  })

  it('calls "onEnter" on mouse enter event', () => {
    const onEnter = jest.fn()
    const props = createProps({ onEnter })
    const wrapper = shallow(<Header {...props} />)
    wrapper.simulate('mouseEnter')
    expect(onEnter).toBeCalled()
  })

  it('calls "onLeave" on mouse leave event', () => {
    const onLeave = jest.fn()
    const props = createProps({ onLeave })
    const wrapper = shallow(<Header {...props} />)
    wrapper.simulate('mouseLeave')
    expect(onLeave).toBeCalled()
  })

  describe('sticky', () => {
    it('ensures the scroll left postion gets updated when a new scrollLeft prop is received', () => {
      let sticky = createStickyProp()
      const props = createProps({ sticky })
      const wrapper = mount(<Header {...props} />)
      expect(wrapper.find('.rt-timeline__header-scroll').instance().scrollLeft).toBe(0)

      sticky = createStickyProp({ scrollLeft: 100 })
      const nextProps = createProps({ sticky })
      wrapper.setProps(nextProps)
      expect(wrapper.find('.rt-timeline__header-scroll').instance().scrollLeft).toBe(100)
    })

    it('ensures the scroll left position is correct when the header becomes sticky', () => {
      let sticky = createStickyProp({ isSticky: false })
      const props = createProps({ sticky })
      const wrapper = mount(<Header {...props} />)
      expect(wrapper.find('.rt-timeline__header-scroll').instance().scrollLeft).toBe(0)

      sticky = createStickyProp({ isSticky: true })
      const nextProps = createProps({ sticky })
      wrapper.setProps(nextProps)
      expect(wrapper.find('.rt-timeline__header-scroll').instance().scrollLeft).toBe(0)
    })

    it('does not update the scrollLeft position if the component updates and the scrollLeft and isSticky props have not changed', () => {
      const sticky = createStickyProp()
      const props = createProps({ sticky })
      const wrapper = mount(<Header {...props} />)
      expect(wrapper.find('.rt-timeline__header-scroll').instance().scrollLeft).toBe(0)

      const nextProps = createProps({ height: 100, sticky })
      wrapper.setProps(nextProps)
      expect(wrapper.find('.rt-timeline__header-scroll').instance().scrollLeft).toBe(0)
    })

    it('calls the setHeaderHeight() prop when mounted', () => {
      const setHeaderHeight = jest.fn()
      const sticky = createStickyProp({ setHeaderHeight })
      const props = createProps({ sticky })
      mount(<Header {...props} />)
      expect(setHeaderHeight).toBeCalled()
    })

    it('makes the header sticky if isSticky is true', () => {
      const sticky = createStickyProp({ isSticky: true })
      const props = createProps({ sticky })
      const wrapper = mount(<Header {...props} />)
      expect(wrapper.find('.rt-timeline__header').prop('className')).toMatch('is-sticky')
    })

    it('makes the header static if isSticky is false', () => {
      const sticky = createStickyProp({ isSticky: false })
      const props = createProps({ sticky })
      const wrapper = mount(<Header {...props} />)
      expect(wrapper.find('.rt-timeline__header').prop('className')).not.toMatch('is-sticky')
    })

    it('sets the viewportWidth and height of the header if sticky', () => {
      const sticky = createStickyProp({ isSticky: true, viewportWidth: 100, headerHeight: 20 })
      const props = createProps({ sticky })
      const wrapper = mount(<Header {...props} />)
      expect(wrapper.find('.rt-timeline__header').prop('style')).toEqual({
        width: 100,
        height: 20,
      })
    })

    it('handles scroll events when sticky', () => {
      const handleHeaderScrollY = jest.fn()
      const sticky = createStickyProp({ isSticky: true, handleHeaderScrollY })
      const props = createProps({ sticky })
      const wrapper = mount(<Header {...props} />)
      wrapper.find('.rt-timeline__header-scroll').simulate('scroll')
      expect(handleHeaderScrollY).toBeCalled()
    })
  })
})
