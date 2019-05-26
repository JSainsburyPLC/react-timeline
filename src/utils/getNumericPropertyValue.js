import computedStyle from './computedStyle'

export default (node, prop) => parseInt(computedStyle(node).getPropertyValue(prop), 10)
