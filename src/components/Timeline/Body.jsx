import React from 'react'
import PropTypes from 'prop-types'

import Tracks from './Tracks'
import Grid from './Grid'

const Body = ({ time, grid, tracks, clickElement }) => (
  <div className="rt-timeline__body">
    {grid && <Grid time={time} grid={grid} />}
    <Tracks time={time} tracks={tracks} clickElement={clickElement} />
  </div>
)

Body.propTypes = {
  time: PropTypes.shape({}).isRequired,
  grid: PropTypes.arrayOf(PropTypes.shape({})),
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  clickElement: PropTypes.func,
}

export default Body
