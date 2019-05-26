import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Timebar from './Timebar'

const noop = () => {}

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.scroll = React.createRef()
    this.timebar = React.createRef()
  }

  componentDidMount() {
    const { sticky } = this.props
    if (sticky) {
      sticky.setHeaderHeight(this.timebar.current.offsetHeight)
      const { scrollLeft, isSticky } = sticky
      if (isSticky) {
        this.scroll.current.scrollLeft = scrollLeft
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { sticky } = this.props
    if (sticky) {
      const { scrollLeft, isSticky } = sticky
      const prevScrollLeft = prevProps.sticky.scrollLeft
      const prevIsSticky = prevProps.sticky.isSticky
      if (scrollLeft !== prevScrollLeft || isSticky !== prevIsSticky) {
        this.scroll.current.scrollLeft = scrollLeft
      }
    }
  }

  handleScroll = () => {
    const { sticky } = this.props
    sticky.handleHeaderScrollY(this.scroll.current.scrollLeft)
  }

  render() {
    const {
      time,
      onMove,
      onEnter,
      onLeave,
      width,
      timebar: rows,
      sticky: { isSticky, headerHeight, viewportWidth } = {},
    } = this.props
    return (
      <div
        style={isSticky ? { paddingTop: headerHeight } : {}}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div
          className={`rt-timeline__header ${isSticky ? 'rt-is-sticky' : ''}`}
          style={isSticky ? { width: viewportWidth, height: headerHeight } : {}}
        >
          <div className="rt-timeline__header-scroll" ref={this.scroll} onScroll={isSticky ? this.handleScroll : noop}>
            <div ref={this.timebar} style={isSticky ? { width } : {}}>
              <Timebar time={time} rows={rows} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  time: PropTypes.shape({}).isRequired,
  timebar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
  onMove: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  sticky: PropTypes.shape({
    isSticky: PropTypes.bool.isRequired,
    setHeaderHeight: PropTypes.func.isRequired,
    viewportWidth: PropTypes.number.isRequired,
    handleHeaderScrollY: PropTypes.func.isRequired,
    scrollLeft: PropTypes.number.isRequired,
  }),
}

export default Header
