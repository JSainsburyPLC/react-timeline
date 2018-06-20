import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ViewportContext from '../Contexts/Viewport'
import Sidebar from '../Sidebar'
import Timeline from '../Timeline'
import { addListener, removeListener } from '../../utils/events'
import raf from '../../utils/raf'
import getNumericPropertyValue from '../../utils/getNumericPropertyValue'

const noop = () => {}

class Layout extends Component {
  constructor(props) {
    super(props)

    this.timeline = React.createRef()
    this.layout = React.createRef()
    this.sidebar = React.createRef()

    this.state = {
      isSticky: false,
      headerHeight: 0,
      scrollLeft: 0,
      viewport: {}
    }
  }

  componentDidMount() {
    if (this.props.enableSticky) {
      addListener('scroll', this.handleScrollY)
      this.updateTimelineHeaderScroll()
      this.updateTimelineBodyScroll()
    }

    addListener('resize', this.handleResize)
    this.handleLayoutChange(() => this.scrollToNow())
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.enableSticky && this.state.isSticky && !prevState.isSticky) {
      this.updateTimelineHeaderScroll()
    }

    if (this.state.scrollLeft !== prevState.scrollLeft) {
      this.updateTimelineBodyScroll()
      this.updateTimelineViewport()
    }

    if (this.props.isOpen !== prevProps.isOpen) {
      this.handleLayoutChange()
    }
  }

  componentWillUnmount() {
    if (this.props.enableSticky) {
      removeListener('scroll', this.handleScrollY)
      removeListener('resize', this.handleResize)
    }
  }

  setHeaderHeight = (headerHeight) => {
    this.setState({ headerHeight })
  }

  scrollToNow = () => {
    const { time, scrollToNow, now } = this.props

    if (scrollToNow) {
      this.timeline.current.scrollLeft = time.toX(now) - (0.5 * this.props.timelineViewportWidth)
    }

    this.updateTimelineHeaderScroll()
  }

  updateTimelineBodyScroll = () => {
    this.timeline.current.scrollLeft = this.state.scrollLeft
  }

  updateTimelineHeaderScroll = () => {
    const { scrollLeft } = this.timeline.current
    this.setState({ scrollLeft }, () => this.updateTimelineViewport())
  }

  updateTimelineViewport = () => {
    const { left, right } = this.timeline.current.getBoundingClientRect()
    this.setState({
      viewport: {
        left: left + this.state.scrollLeft,
        right: right + this.state.scrollLeft
      }
    })
  }

  handleHeaderScrollY = (scrollLeft) => {
    raf(() => {
      this.setState({ scrollLeft })
    })
  }

  handleScrollY = () => {
    raf(() => {
      const { headerHeight } = this.state
      const markerHeight = 0
      const { top, bottom } = this.timeline.current.getBoundingClientRect()
      const isSticky = (top <= -markerHeight) && (bottom >= headerHeight)
      this.setState(() => ({ isSticky }))
    })
  }

  handleScrollX = () => {
    raf(this.updateTimelineHeaderScroll)
  }

  calculateSidebarWidth = () => this.sidebar.current.offsetWidth + getNumericPropertyValue(this.layout.current, 'margin-left')

  calculateTimelineViewportWidth = () => this.timeline.current.offsetWidth

  handleLayoutChange = (cb) => {
    const sidebarWidth = this.calculateSidebarWidth()
    const timelineViewportWidth = this.calculateTimelineViewportWidth()
    if (
      sidebarWidth !== this.props.sidebarWidth ||
      timelineViewportWidth !== this.props.timelineViewportWidth
    ) {
      this.props.onLayoutChange(
        {
          sidebarWidth: this.calculateSidebarWidth(),
          timelineViewportWidth: this.calculateTimelineViewportWidth()
        },
        cb
      )
    }
  }

  handleResize = () => this.handleLayoutChange()

  render() {
    const {
      isOpen,
      tracks,
      now,
      time,
      timebar,
      toggleTrackOpen,
      sidebarWidth,
      timelineViewportWidth
    } = this.props

    const {
      isSticky,
      headerHeight,
      scrollLeft,
      viewport
    } = this.state

    return (
      <div
        className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`}
        ref={this.layout}
      >
        <div
          className="rt-layout__side"
          ref={this.sidebar}
        >
          <Sidebar
            timebar={timebar}
            tracks={tracks}
            toggleTrackOpen={toggleTrackOpen}
            sticky={{ isSticky, headerHeight, sidebarWidth }}
          />
        </div>
        <div className="rt-layout__main">
          <div
            className="rt-layout__timeline"
            ref={this.timeline}
            onScroll={isSticky ? this.handleScrollX : noop}
          >
            <ViewportContext.Provider value={viewport}>
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
            </ViewportContext.Provider>
          </div>
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  enableSticky: PropTypes.bool.isRequired,
  timebar: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  time: PropTypes.shape({}).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  now: PropTypes.instanceOf(Date),
  isOpen: PropTypes.bool,
  toggleTrackOpen: PropTypes.func,
  scrollToNow: PropTypes.bool,
  onLayoutChange: PropTypes.func.isRequired,
  sidebarWidth: PropTypes.number,
  timelineViewportWidth: PropTypes.number
}

export default Layout
