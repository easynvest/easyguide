import React from 'react'
import 'jest-dom/extend-expect'
import {render} from 'react-testing-library'
import Separator from '../Separator'

describe('<Separator />', () => {
  it('should render correctly with an icon name', () => {
    const rtl = render(<Separator />)

    expect(rtl.container.querySelector('div')).toBeInTheDocument()
  })
})
