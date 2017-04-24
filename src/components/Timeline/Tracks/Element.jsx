import React, { PropTypes } from 'react'
import BasicElement from '../../Elements/Basic'
import datePropType from '../../../utils/datePropType'

const Element = ({ time, trackStyle, style, id, title, start, end }) =>
  <div
    key={id}
    className="track__element"
    style={time.toStyleLeftAndWidth(start, end)}
  >
    <BasicElement
      title={title}
      style={{ ...trackStyle, ...style }}
    />
  </div>

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
