import React, { PropTypes } from 'react'
import BasicElement from '../../Elements/Basic'
import datePropType from '../../../utils/datePropType'

const Element = ({ time, trackStyle, style, id, title, start, end }) => {
  const width = parseInt(time.toStyleLeftAndWidth(start, end).width, 10)
  const paddingStyle = width < 20 && { padding: `0 0 0 ${width}px` }
  return (
    <div
      key={id}
      className="track__element"
      style={time.toStyleLeftAndWidth(start, end)}
    >
      <BasicElement
        title={title}
        style={{ ...trackStyle, ...style, ...paddingStyle }}
      />
    </div>
  )
}

Element.propTypes = {
  time: PropTypes.shape({}).isRequired,
  trackStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  start: datePropType,
  end: datePropType
}

export default Element
