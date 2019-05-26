import React from 'react'
import { mount } from 'enzyme'
import Controls from '..'
import Toggle from '../Toggle'

const createProps = ({
  isOpen = undefined,
  toggleOpen = jest.fn(),
  zoomIn = jest.fn(),
  zoomOut = jest.fn(),
  zoom = 2,
  zoomMin = 1,
  zoomMax = 10,
} = {}) => ({
  isOpen,
  toggleOpen,
  zoomIn,
  zoomOut,
  zoom,
  zoomMin,
  zoomMax,
})

describe('<Controls />', () => {
  describe('Toggle', () => {
    it('render <Toggle />', () => {
      const props = createProps()
      const wrapper = mount(<Controls {...props} />)
      expect(wrapper.find(Toggle).exists()).toBe(true)
    })

    it('do not render <Toggle /> if no "toggleOpen" prop', () => {
      const props = { ...createProps(), toggleOpen: undefined }
      const wrapper = mount(<Controls {...props} />)
      expect(wrapper.find(Toggle).exists()).toBe(false)
    })
  })

  describe('Zoom in button', () => {
    const findButton = node => node.find('.rt-controls__button--zoom-in')

    it('not rendered if no "zoomIn" fn passed', () => {
      const props = { ...createProps(), zoomIn: undefined }
      const wrapper = mount(<Controls {...props} />)
      expect(findButton(wrapper).exists()).toBe(false)
    })

    it('is disabled when "zoom" is equal to "zoomMax"', () => {
      const props = createProps({ zoom: 5, zoomMax: 5 })
      const wrapper = mount(<Controls {...props} />)
      expect(findButton(wrapper).prop('disabled')).toBe(true)
    })

    it('is disabled when "zoom" is greater than "zoomMax"', () => {
      const props = createProps({ zoom: 6, zoomMax: 5 })
      const wrapper = mount(<Controls {...props} />)
      expect(findButton(wrapper).prop('disabled')).toBe(true)
    })

    it('is not disabled when "zoom" is less than "zoomMax"', () => {
      const props = createProps({ zoom: 2, zoomMax: 5 })
      const wrapper = mount(<Controls {...props} />)
      expect(findButton(wrapper).prop('disabled')).toBe(false)
    })

    it('calls "zoomIn() when clicked"', () => {
      const zoomIn = jest.fn()
      const props = createProps({ zoom: 2, zoomMax: 5, zoomIn })
      const wrapper = mount(<Controls {...props} />)
      findButton(wrapper).simulate('click')
      expect(zoomIn).toBeCalled()
    })
  })

  describe('Zoom out button', () => {
    const findButton = node => node.find('.rt-controls__button--zoom-out')

    it('not rendered if no "zoomOut" fn passed', () => {
      const props = { ...createProps(), zoomOut: undefined }
      const wrapper = mount(<Controls {...props} />)
      expect(findButton(wrapper).exists()).toBe(false)
    })

    it('is disabled when "zoom" is equal to "zoomMin"', () => {
      const props = createProps({ zoom: 2, zoomMin: 2 })
      const wrapper = mount(<Controls {...props} />)
      expect(findButton(wrapper).prop('disabled')).toBe(true)
    })

    it('is disabled when "zoom" is less than "zoomMin"', () => {
      const props = createProps({ zoom: 1, zoomMin: 2 })
      const wrapper = mount(<Controls {...props} />)
      expect(findButton(wrapper).prop('disabled')).toBe(true)
    })

    it('is not disabled when "zoom" is greater than "zoomMin"', () => {
      const props = createProps({ zoom: 5, zoomMin: 2 })
      const wrapper = mount(<Controls {...props} />)
      expect(findButton(wrapper).prop('disabled')).toBe(false)
    })

    it('calls "zoomOut() when clicked"', () => {
      const zoomOut = jest.fn()
      const props = createProps({ zoom: 5, zoomMin: 2, zoomOut })
      const wrapper = mount(<Controls {...props} />)
      findButton(wrapper).simulate('click')
      expect(zoomOut).toBeCalled()
    })
  })
})
