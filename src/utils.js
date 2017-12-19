export const pad2 = (v) => {
  return `${v}`.padStart(2, '0')
}

export const formatDuration = (duration) => {
  return pad2(Math.floor(duration.asHours())) + ':' + pad2(duration.minutes()) + ':' + pad2(duration.seconds())
}

export const calcDurationValue=(duration) => {
  return (duration.asHours() / 8).toFixed(2)
}
