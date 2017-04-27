import React, { PropTypes } from 'react'
import elements from '../../Elements'

const TrackElement = ({ type = 'Basic', time, style, id, title, start, end, tooltip }) => {
  const Element = elements[type]
  return (
    <div
      key={id}
      className="track__element"
      style={time.toStyleLeftAndWidth(start, end)}
    >
      {
        <Element
          tooltip={tooltip}
          title={title}
          start={start}
          end={end}
          style={{ ...style }}
        />
      }
    </div>
  )
}

TrackElement.propTypes = {
  type: PropTypes.string,
  time: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  tooltip: PropTypes.string
}

export default TrackElement
