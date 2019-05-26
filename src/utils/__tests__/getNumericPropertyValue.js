import getNumericPropertyValue from '../getNumericPropertyValue'
import computedStyle from '../computedStyle'

jest.mock('../computedStyle')

describe('getNumericPropertyValue', () => {
  it('returns the numeric portion within a property value of a DOM node', () => {
    computedStyle.mockImplementation(node => ({
      getPropertyValue(prop) {
        return node.style[prop]
      },
    }))
    const node = {
      style: {
        height: '100px',
      },
    }
    const actual = getNumericPropertyValue(node, 'height')
    expect(actual).toBe(100)
  })
})
