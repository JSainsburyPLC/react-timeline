import React from 'react'
import { shallow } from 'enzyme'

import Timeline from '..'
import Controls from '../components/Controls'
import Layout from '../components/Layout'

const defaultStart = new Date('2010-01-01')
const defaultEnd = new Date('2030-01-01')

const createScaleProps = ({
  start = defaultStart,
  end = defaultEnd,
  zoom = 1,
  zoomMin = undefined,
  zoomMax = undefined,
  minWidth = undefined,
} = {}) => ({
  start,
  end,
  zoom,
  zoomMin,
  zoomMax,
  minWidth,
})

const createProps = ({
  now = new Date(),
  scale = createScaleProps(),
  isOpen = undefined,
  timebar = [],
  tracks = [],
  toggleOpen = jest.fn(),
  zoomIn = jest.fn(),
  zoomOut = jest.fn(),
} = {}) => ({
  now,
  scale,
  isOpen,
  timebar,
  tracks,
  toggleOpen,
  zoomIn,
  zoomOut,
})

describe('<Timeline />', () => {
  describe('Timeline', () => {
    it('renders <Controls />', () => {
      const props = createProps()
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.find(Controls).exists()).toBe(true)
    })

    it('renders <Layout />', () => {
      const props = createProps()
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.find(Layout).exists()).toBe(true)
    })

    it('re-renders when zoom changes', () => {
      const props = { ...createProps(), scale: createScaleProps({ zoom: 1 }) }
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.state('time').zoom).toBe(1)

      const nextProps = { ...props, scale: createScaleProps({ zoom: 2 }) }

      wrapper.setProps(nextProps)
      expect(wrapper.state('time').zoom).toBe(2)

      wrapper.setProps(nextProps)
      expect(wrapper.state('time').zoom).toBe(2)
    })

    it('renders the sidebar open by default', () => {
      const props = createProps()
      const wrapper = shallow(<Timeline {...props} />)
      expect(wrapper.find(Layout).prop('isOpen')).toBe(true)
    })
  })
})
