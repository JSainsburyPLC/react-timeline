import React, { PropTypes } from 'react'

const Basic = ({ title, style }) =>
  <div className="element" style={style}>
    <div className="element__content">
      { title }
    </div>
  </div>

Basic.propTypes = {
  title: PropTypes.string,
  style: PropTypes.shape({})
}

export default Basic
