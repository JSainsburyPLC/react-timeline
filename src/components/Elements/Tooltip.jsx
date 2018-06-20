import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getDayMonth } from '../../utils/formatDate'

class Tooltip extends Component {
  constructor(props) {
    super(props)

    this.selfRef = React.createRef()
    this.state = {
      bounds: {}
    }
  }

  componentDidMount() {
    const bounds = this.selfRef.current.getBoundingClientRect()

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ bounds })
  }

  render() {
    const {
      title,
      start,
      end,
      tooltip,
      viewport
    } = this.props
    const { bounds } = this.state

    let offset = 0
    let className = 'rt-element__tooltip'

    if (bounds.left < viewport.left) {
      offset = Math.floor(viewport.left - bounds.left)
      className += ' rt-element__tooltip--left'
    }

    if (bounds.right > viewport.right) {
      offset = -Math.ceil(bounds.right - viewport.right)
      className += ' rt-element__tooltip--right'
    }

    const style = {
      marginLeft: `${offset}px`
    }

    return (
      <div className={className} ref={this.selfRef} style={style}>
        {
          tooltip
            // eslint-disable-next-line react/no-danger
            ? <div dangerouslySetInnerHTML={{ __html: tooltip.split('\n').join('<br>') }} />
            : (
              <div>
                <div>{title}</div>
                <div><strong>Start</strong> {getDayMonth(start)}</div>
                <div><strong>End</strong> {getDayMonth(end)}</div>
              </div>
            )
        }
      </div>
    )
  }
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  tooltip: PropTypes.string,
  viewport: PropTypes.shape({
    left: PropTypes.number
  })
}

Tooltip.defaultProps = {
  viewport: {
    left: 0
  }
}

export default Tooltip
