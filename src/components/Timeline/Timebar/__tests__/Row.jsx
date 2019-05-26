import React from 'react'
import { shallow } from 'enzyme'

import Row from '../Row'
import Cell from '../Cell'

describe('<Row />', () => {
  it('renders the <Cell /> components', () => {
    const props = {
      time: {},
      cells: [
        {
          title: 'test',
          start: new Date(),
          end: new Date(),
          id: '1',
        },
        {
          title: 'test',
          start: new Date(),
          end: new Date(),
          id: '2',
        },
      ],
    }
    const wrapper = shallow(<Row {...props} />)
    expect(wrapper.find(Cell)).toHaveLength(2)
  })
})
