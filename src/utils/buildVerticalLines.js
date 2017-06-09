const getStartXs = (time, { cells }) => cells.map(cell => time.toX(cell.start))

const buildGridStyle = (time, timebar) => {
  const gradient = getStartXs(time, timebar).reduce((str, x) =>
    `${str} white ${x}px, #eee ${x}px, #eee ${x + 1}px, white ${x + 1}px,`
  , '').slice(0, -1)
  return { background: `linear-gradient(to right, ${gradient})` }
}

export default buildGridStyle
