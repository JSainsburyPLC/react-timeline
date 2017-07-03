import React from 'react'
import { shallow } from 'enzyme'

import TrackKey from '../TrackKey'
import TrackKeys from '../'

describe('<TrackKey />', () => {
  describe('link button', () => {
    const getButton = node => node.find('.rt-track-key__button')

    it('renders a button if "hasButton" is true and "clickTrackButton" exists', () => {
      const track = { title: 'test', isOpen: true, hasButton: true }
      const context = { clickTrackButton: jest.fn() }

      const wrapper = shallow(<TrackKey track={track} />, { context })
      expect(getButton(wrapper).exists()).toBe(true)
    })

    it('does not render when "hasButton" is false', () => {
      const track = { title: 'test', isOpen: true }
      const context = { clickTrackButton: jest.fn() }

      const wrapper = shallow(<TrackKey track={track} />, { context })
      expect(getButton(wrapper).exists()).toBe(false)
    })

    it('does not render when "clickTrackButton" does not exist', () => {
      const track = { title: 'test', isOpen: true, hasButton: true }
      const context = {}

      const wrapper = shallow(<TrackKey track={track} />, { context })
      expect(getButton(wrapper).exists()).toBe(false)
    })

    it('calls "clickTrackButton" with the track when clicked', () => {
      const track = { title: 'test', isOpen: true, hasButton: true }
      const clickTrackButton = jest.fn()
      const context = { clickTrackButton }

      const wrapper = shallow(<TrackKey track={track} />, { context })
      const button = getButton(wrapper)

      expect(clickTrackButton).not.toBeCalled()
      button.simulate('click')
      expect(clickTrackButton).toBeCalledWith(track)
    })
  })

  describe('toggle button', () => {
    const getToggleButton = node => node.find('.rt-track-key__toggle')

    it('renders when "track.isOpen" is defined', () => {
      const props = {
        track: { title: 'test', isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(getToggleButton(wrapper).exists()).toBe(true)
    })

    it('does not render when "track.isOpen" is undefined', () => {
      const props = {
        track: { title: 'test', isOpen: undefined },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(getToggleButton(wrapper).exists()).toBe(false)
    })

    it('renders with the text "Close" when "track.isOpen" is "true"', () => {
      const props = {
        track: { title: 'test', isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(getToggleButton(wrapper).text()).toBe('Close')
    })

    it('renders with the text "Open" when "track.isOpen" is "false"', () => {
      const props = {
        track: { title: 'test', isOpen: false },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(getToggleButton(wrapper).text()).toBe('Open')
    })

    it('calls "toggleOpen()" when clicked passing "track" as a single argument', () => {
      const track = {
        title: 'test',
        isOpen: false
      }
      const toggleOpen = jest.fn()
      const props = {
        track,
        toggleOpen
      }
      const wrapper = shallow(<TrackKey {...props} />)
      getToggleButton(wrapper).simulate('click')
      expect(toggleOpen).toBeCalledWith(track)
    })
  })

  describe('<TrackKeys />', () => {
    it('renders when "isOpen" is truthy and "tracks" is not empty', () => {
      const props = {
        track: { title: 'test', tracks: [{}], isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(wrapper.find(TrackKeys).exists()).toBe(true)
    })

    it('does not render when "isOpen" is falsy', () => {
      const props = {
        track: { title: 'test', tracks: [{}], isOpen: false },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(wrapper.find(TrackKeys).exists()).toBe(false)
    })

    it('does not render when "tracks" is falsy', () => {
      const props = {
        track: { title: 'test', tracks: null, isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(wrapper.find(TrackKeys).exists()).toBe(false)
    })

    it('does not render when "tracks" is an empty array', () => {
      const props = {
        track: { title: 'test', tracks: [], isOpen: true },
        toggleOpen: jest.fn()
      }
      const wrapper = shallow(<TrackKey {...props} />)
      expect(wrapper.find(TrackKeys).exists()).toBe(false)
    })
  })
})
