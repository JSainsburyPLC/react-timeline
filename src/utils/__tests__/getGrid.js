import getGrid from '../getGrid'

describe('getGrid', () => {
  it('returns the cells from the first timebar row that has "useAsGrid" set to true', () => {
    const timebar = [
      {
        cells: [{ id: 'row-1-cell-1' }],
      },
      {
        useAsGrid: true,
        cells: [{ id: 'row-2-cell-1' }],
      },
      {
        useAsGrid: true,
        cells: [{ id: 'row-3-cell-1' }],
      },
    ]
    const actual = getGrid(timebar)
    const expected = [{ id: 'row-2-cell-1' }]
    expect(actual).toEqual(expected)
  })

  it('returns "undefined" if none of the rows have "useAsGrid" set to true', () => {
    const timebar = [{ cells: [] }]
    const actual = getGrid(timebar)
    expect(actual).toEqual(undefined)
  })
})
