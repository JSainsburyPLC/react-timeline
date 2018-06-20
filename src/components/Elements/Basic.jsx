import React from 'react'
import PropTypes from 'prop-types'

import createClasses from '../../utils/classes'
import Tooltip from './Tooltip'
import Viewport from '../Contexts/Viewport'

const buildDataAttributes = (attributes = {}) => {
  const value = {}
  Object.keys(attributes).forEach((name) => {
    value[`data-${name}`] = attributes[name]
  })
  return value
}

const Basic = ({
  title, start, end, style, classes, dataSet, tooltip
}) => (
  <div
    className={createClasses('rt-element', classes)}
    style={style}
    {...buildDataAttributes(dataSet)}
  >
    <div className="rt-element__content" aria-hidden="true">
      <span className="rt-element__title">{ title }</span>
    </div>
    <Viewport.Consumer>
      {
        viewport => (
          <Tooltip
            title={title}
            start={start}
            end={end}
            tooltip={tooltip}
            viewport={viewport}
          />
        )
      }
    </Viewport.Consumer>
  </div>
)

Basic.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  style: PropTypes.shape({}),
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
  dataSet: PropTypes.shape({}),
  tooltip: PropTypes.string
}

export default Basic
