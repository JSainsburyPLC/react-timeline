import React from 'react'
import { shallow } from 'enzyme'

import Timebar from '..'
import Row from '../Row'

describe('<Timebar />', () => {
  it('renders <Row /> components', () => {
    const props = {
      time: {},
      rows: [{ id: '1', cells: [] }, { id: '1', cells: [] }],
    }
    const wrapper = shallow(<Timebar {...props} />)
    expect(wrapper.find(Row)).toHaveLength(2)
  })
})
