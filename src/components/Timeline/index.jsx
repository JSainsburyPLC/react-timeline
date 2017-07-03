import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'
import NowMarker from './Marker/Now'
import PointerMarker from './Marker/Pointer'

import getMouseX from '../../utils/getMouseX'
import { propTypeTimebar } from '../../propTypes'

import getGrid from '../../utils/getGrid'

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)

    this.state = {
      pointerDate: null,
      pointerVisible: false,
      pointerHighlighted: false
    }
  }

  handleMouseMove(e) {
    this.setState({ pointerDate: this.props.time.fromX(getMouseX(e)) })
  }

  handleMouseLeave() {
    this.setState({ pointerHighlighted: false })
  }

  handleMouseEnter() {
    this.setState({ pointerVisible: true, pointerHighlighted: true })
  }

  render() {
    const {
      now,
      time,
      timebar,
      tracks,
      sticky
    } = this.props
    const {
      pointerDate,
      pointerVisible,
      pointerHighlighted
    } = this.state
    const grid = getGrid(timebar)
    return (
      <div className="rt-timeline" style={{ width: `${time.timelineWidth}px` }}>
        {now && <NowMarker now={now} visible time={time} />}
        {pointerDate &&
          <PointerMarker
            date={pointerDate}
            time={time}
            visible={pointerVisible}
            highlighted={pointerHighlighted}
          />
        }
        <Header
          time={time}
          timebar={timebar}
          onMove={this.handleMouseMove}
          onEnter={this.handleMouseEnter}
          onLeave={this.handleMouseLeave}
          width={time.timelineWidth}
          sticky={sticky}
        />
        <Body time={time} grid={grid} tracks={tracks} />
      </div>
    )
  }
}

Timeline.propTypes = {
  now: PropTypes.instanceOf(Date),
  time: PropTypes.shape({
    fromX: PropTypes.func.isRequired
  }).isRequired,
  timebar: propTypeTimebar.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  sticky: PropTypes.shape({})
}

export default Timeline
