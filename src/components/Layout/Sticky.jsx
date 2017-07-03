import React, { PureComponent } from 'react'
import Sidebar from '../Sidebar'
import Timeline from '../Timeline'
import propTypes from './propTypes'
import { addListener, removeListener } from '../../utils/events'
import raf from '../../utils/raf'
import getNumericPropertyValue from '../../utils/getNumericPropertyValue'

class StickyLayout extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isSticky: false,
      headerHeight: 0,
      markerHeight: 0,
      sidebarWidth: 0,
      timelineViewportWidth: 0,
      scrollLeft: 0
    }

    this.handleScrollX = this.handleScrollX.bind(this)
    this.handleHeaderScrollY = this.handleHeaderScrollY.bind(this)
    this.handleScrollY = this.handleScrollY.bind(this)
    this.handleResize = this.handleResize.bind(this)

    this.setHeaderHeight = this.setHeaderHeight.bind(this)
    this.setTimelineViewportWidth = this.setTimelineViewportWidth.bind(this)
    this.updateTimelineBodyScroll = this.updateTimelineBodyScroll.bind(this)

    this.updateSidebarWidth = this.updateSidebarWidth.bind(this)
    this.updateTimelineHeaderScroll = this.updateTimelineHeaderScroll.bind(this)
  }

  componentDidMount() {
    addListener('scroll', this.handleScrollY)
    addListener('resize', this.handleResize)
    this.updateSidebarWidth()
    this.updateTimelineHeaderScroll()
    this.updateTimelineBodyScroll()
    this.setTimelineViewportWidth(this.timeline.offsetWidth)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.updateSidebarWidth()
    }

    if (this.state.isSticky) {
      if (!prevState.isSticky) {
        this.updateTimelineHeaderScroll()
        this.setTimelineViewportWidth(this.timeline.offsetWidth)
      }

      if (this.state.scrollLeft !== prevState.scrollLeft) {
        this.updateTimelineBodyScroll()
      }
    }
  }

  componentWillUnmount() {
    removeListener('scroll', this.handleScrollY)
    removeListener('resize', this.handleResize)
  }

  setHeaderHeight(headerHeight) {
    this.setState({ headerHeight })
  }

  setTimelineViewportWidth(timelineViewportWidth) {
    this.setState({ timelineViewportWidth })
  }

  updateSidebarWidth() {
    const layoutOffset = getNumericPropertyValue(this.layout, 'margin-left')
    const sidebarWidth = (this.sidebar.offsetWidth + layoutOffset)
    this.setState({ sidebarWidth })
  }

  updateTimelineBodyScroll() {
    this.timeline.scrollLeft = this.state.scrollLeft
  }

  updateTimelineHeaderScroll() {
    const scrollLeft = this.timeline.scrollLeft
    this.setState({ scrollLeft })
  }

  handleHeaderScrollY(scrollLeft) {
    raf(() => {
      this.setState({ scrollLeft })
    })
  }

  handleScrollY() {
    raf(() => {
      const { headerHeight } = this.state
      const markerHeight = 50
      const { top, bottom } = this.timeline.getBoundingClientRect()
      const isSticky = (top <= -markerHeight) && (bottom >= headerHeight)
      this.setState(() => ({ isSticky }))
    })
  }

  handleScrollX() {
    raf(this.updateTimelineHeaderScroll)
  }

  handleResize() {
    raf(() => {
      this.updateSidebarWidth()
      this.setTimelineViewportWidth(this.timeline.offsetWidth)
    })
  }

  render() {
    const { isOpen, tracks, now, time, timebar, toggleTrackOpen } = this.props
    const {
      isSticky,
      headerHeight,
      sidebarWidth,
      timelineViewportWidth,
      scrollLeft
    } = this.state
    return (
      <div className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`} ref={(layout) => { this.layout = layout }}>
        <div className="rt-layout__side" ref={(sidebar) => { this.sidebar = sidebar }}>
          <Sidebar
            timebar={timebar}
            tracks={tracks}
            toggleTrackOpen={toggleTrackOpen}
            sticky={{ isSticky, headerHeight, sidebarWidth }}
          />
        </div>
        <div className="rt-layout__main">
          <div className="rt-layout__timeline" ref={(timeline) => { this.timeline = timeline }} onScroll={isSticky && this.handleScrollX}>
            <Timeline
              now={now}
              time={time}
              timebar={timebar}
              tracks={tracks}
              sticky={{
                isSticky,
                setHeaderHeight: this.setHeaderHeight,
                viewportWidth: timelineViewportWidth,
                handleHeaderScrollY: this.handleHeaderScrollY,
                headerHeight,
                scrollLeft
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

StickyLayout.propTypes = propTypes

export default StickyLayout
