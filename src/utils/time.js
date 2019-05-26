const MILLIS_IN_A_DAY = 24 * 60 * 60 * 1000

const create = ({ start, end, zoom, viewportWidth = 0, minWidth = 0 }) => {
  const duration = end - start

  const days = duration / MILLIS_IN_A_DAY
  const daysZoomWidth = days * zoom

  let timelineWidth

  if (daysZoomWidth > viewportWidth) {
    timelineWidth = daysZoomWidth
  } else {
    timelineWidth = viewportWidth
  }

  if (timelineWidth < minWidth) {
    timelineWidth = minWidth
  }

  const timelineWidthStyle = `${timelineWidth}px`

  const toX = from => {
    const value = (from - start) / duration
    return Math.round(value * timelineWidth)
  }

  const toStyleLeft = from => ({
    left: `${toX(from)}px`,
  })

  const toStyleLeftAndWidth = (from, to) => {
    const left = toX(from)
    return {
      left: `${left}px`,
      width: `${toX(to) - left}px`,
    }
  }

  const fromX = x => new Date(start.getTime() + (x / timelineWidth) * duration)

  return {
    timelineWidth,
    timelineWidthStyle,
    start,
    end,
    zoom,
    toX,
    toStyleLeft,
    toStyleLeftAndWidth,
    fromX,
  }
}

export default create
