/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

import BasicElement from '../../Elements/Basic'

const Element = props => {
  const { time, style, title, start, end, classes, dataSet, tooltip, clickElement } = props

  const handleClick = () => {
    clickElement(props)
  }
  const elementStyle = {
    ...time.toStyleLeftAndWidth(start, end),
    ...(clickElement ? { cursor: 'pointer' } : {}),
  }

  return (
    <div className="rt-track__element" style={elementStyle} onClick={clickElement && handleClick && handleClick}>
      <BasicElement
        title={title}
        start={start}
        end={end}
        style={style}
        classes={classes}
        dataSet={dataSet}
        tooltip={tooltip}
      />
    </div>
  )
}

Element.propTypes = {
  time: PropTypes.shape({
    toStyleLeftAndWidth: PropTypes.func,
  }).isRequired,
  style: PropTypes.shape({}),
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
  dataSet: PropTypes.shape({}),
  title: PropTypes.string,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  tooltip: PropTypes.string,
  clickElement: PropTypes.func,
}

Element.defaultTypes = {
  clickElement: undefined,
}

export default Element
