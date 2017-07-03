import React from 'react'
import Sidebar from '../Sidebar'
import Timeline from '../Timeline'
import propTypes from './propTypes'

const Layout = ({ isOpen, tracks, now, time, timebar, toggleTrackOpen }) => (
  <div className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`}>
    <div className="rt-layout__side">
      <Sidebar
        timebar={timebar}
        tracks={tracks}
        toggleTrackOpen={toggleTrackOpen}
      />
    </div>
    <div className="rt-layout__main">
      <div className="rt-layout__timeline">
        <Timeline
          now={now}
          time={time}
          timebar={timebar}
          tracks={tracks}
        />
      </div>
    </div>
  </div>
)

Layout.propTypes = propTypes

export default Layout
