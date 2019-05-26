import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ timebar, sticky: { isSticky, sidebarWidth, headerHeight } = {} }) => (
  <div style={isSticky ? { paddingTop: headerHeight } : {}}>
    <div
      className={`rt-sidebar__header ${isSticky ? 'rt-is-sticky' : ''}`}
      style={isSticky ? { width: sidebarWidth } : {}}
    >
      {timebar.map(({ id, title }) => (
        <div key={id} className="rt-timebar-key">
          {title}
        </div>
      ))}
    </div>
  </div>
)

Header.propTypes = {
  sticky: PropTypes.shape({
    isSticky: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number.isRequired,
    sidebarWidth: PropTypes.number.isRequired,
  }),
  timebar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
}

export default Header
