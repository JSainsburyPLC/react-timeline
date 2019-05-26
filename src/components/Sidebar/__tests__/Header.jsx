import React from 'react'
import { shallow } from 'enzyme'

import Header from '../Header'

const defaultSticky = {
  isSticky: false,
  sidebarWidth: 0,
  headerHeight: 0,
}

const defaultProps = {
  timebar: [],
  sticky: { ...defaultSticky },
}

describe('<Header />', () => {
  it('renders the title for each row', () => {
    const timebar = [{ id: '1', title: 'row-1' }, { id: '1', title: 'row-2' }]
    const props = { ...defaultProps, timebar }
    const wrapper = shallow(<Header {...props} />)
    expect(
      wrapper
        .find('.rt-timebar-key')
        .first()
        .text()
    ).toBe('row-1')
    expect(
      wrapper
        .find('.rt-timebar-key')
        .last()
        .text()
    ).toBe('row-2')
  })

  it('reserves the space taken up by the header when it is sticky', () => {
    const sticky = {
      ...defaultSticky,
      isSticky: true,
      headerHeight: 100,
    }
    const props = { ...defaultProps, sticky }
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.prop('style')).toEqual({
      paddingTop: 100,
    })
  })

  it('does not reserve the space taken up by the header when it is static', () => {
    const sticky = {
      ...defaultSticky,
      isSticky: false,
      headerHeight: 100,
    }
    const props = { ...defaultProps, sticky }
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.prop('style')).toEqual({})
  })

  it('becomes sticky when it receives a sticky prop', () => {
    const sticky = {
      ...defaultSticky,
      isSticky: true,
      sidebarWidth: 200,
    }
    const props = { ...defaultProps, sticky }
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.find('.rt-sidebar__header').hasClass('rt-is-sticky')).toBe(true)
    expect(wrapper.find('.rt-sidebar__header').prop('style')).toEqual({ width: 200 })
  })

  it('becomes static when it receives a falsy sticky prop', () => {
    const sticky = {
      ...defaultSticky,
      isSticky: false,
      sidebarWidth: 200,
    }
    const props = { ...defaultProps, sticky }
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.find('.rt-sidebar__header').hasClass('rt-is-sticky')).toBe(false)
    expect(wrapper.find('.rt-sidebar__header').prop('style')).toEqual({})
  })
})
