import React, { PropTypes, Component } from 'react'
import Header from './Header'
import Body from './Body'
import NowMarker from './Marker/Now'
import PointerMarker from './Marker/Pointer'

import datePropType from '../../utils/datePropType'
import getMouseX from '../../utils/getMouseX'
import { getDayMonth } from '../../utils/formatDate'

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)

    this.state = { pointerX: 0, pointerVisible: false, pointerHighlighted: false }
  }

  handleMouseMove(e) {
    this.setState({ pointerX: getMouseX(e) })
  }

  handleMouseLeave() {
    this.setState({ pointerHighlighted: false })
  }

  handleMouseEnter() {
    this.setState({ pointerVisible: true, pointerHighlighted: true })
  }

  render() {
    const { now, time, timebar, tracks } = this.props
    const { pointerX, pointerVisible, pointerHighlighted } = this.state
    return (
      <div className="timeline">
        <div className="timeline__content" style={{ width: `${time.timelineWidth}px` }}>
          {now && <NowMarker now={now} visible time={time} />}
          <PointerMarker
            x={pointerX}
            visible={pointerVisible}
            highlighted={pointerHighlighted}
            text={getDayMonth(time.fromX(pointerX))}
          />
          <div
            onMouseMove={this.handleMouseMove}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <Header time={time} timebar={timebar} />
          </div>
          <Body time={time} tracks={tracks} />
        </div>
      </div>
    )
  }
}

Timeline.propTypes = {
  now: datePropType,
  time: PropTypes.shape({}).isRequired,
  timebar: PropTypes.shape({}).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({}))
}

export default Timeline
