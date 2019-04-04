import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Select from '../Select'

describe('<Select />', () => {
  const placeholder = 'Selecione...'
  const data = [
    { key: 1, value: 'Option 1' },
    { key: 2, value: 'Option 2' }
  ]

  it('should render correctly', () => {
    const rtl = render(
      <Select
        data={data}
        placeholder={placeholder}
      />
    )

    expect(rtl.getByText(placeholder)).toBeInTheDocument()
  })

  it('should select an item', () => {
    const rtl = render(
      <Select
        data={data}
        placeholder={placeholder}
      />
    )

    fireEvent.click(rtl.getByText(placeholder))
    fireEvent.click(rtl.getByText('Option 1'))

    expect(rtl.getByText('Option 1')).toBeInTheDocument()
  })

  it('should render custom selected item', () => {
    const rtl = render(
      <Select
        data={data}
        render={item => `Selected - ${item.key}`}
        placeholder={placeholder}
      />
    )

    fireEvent.click(rtl.getByText(placeholder))
    fireEvent.mouseDown(rtl.getByText('Option 1'))

    expect(rtl.getByText('Selected - 1')).toBeInTheDocument()
  })

  it('should render custom list item', () => {
    const rtl = render(
      <Select
        data={data}
        renderListItem={item => `${item.key} - ${item.value}`}
        placeholder={placeholder}
      />
    )

    fireEvent.click(rtl.getByText(placeholder))
    data.forEach(item => {
      expect(rtl.getByText(`${item.key} - ${item.value}`)).toBeInTheDocument()
    })
  })

  it('should render with an extra item', () => {
    const rtl = render(
      <Select
        data={data}
        renderCustomListItem={() => 'extra item'}
        placeholder={placeholder}
      />
    )

    fireEvent.click(rtl.getByText(placeholder))

    expect(rtl.getByText('extra item')).toBeInTheDocument()
  })

  it('should render with live search', () => {
    const rtl = render(
      <Select
        liveSearch
        data={data}
        emptyListText="Nenhum resultado encontrado"
        placeholder={placeholder}
      />
    )
    
    fireEvent.click(rtl.container.querySelector('input'))
    fireEvent.change(rtl.container.querySelector('input'), {
      target: { value: 'xpto' }
    })

    expect(rtl.getByText('Nenhum resultado encontrado')).toBeInTheDocument()

    fireEvent.click(rtl.container.querySelector('input'))
    fireEvent.change(rtl.container.querySelector('input'), {
      target: { value: '1' }
    })

    expect(rtl.getByText('Option 1')).toBeInTheDocument()
    expect(Array.from(rtl.container.querySelectorAll('li'))).toHaveLength(1)
  })

  it('should dispatch onChange with current value', () => {
    const onChange = jest.fn(item => item)
    const rtl = render(
      <Select
        data={data}
        onChange={onChange}
        placeholder={placeholder}
      />
    )

    fireEvent.click(rtl.getByText(placeholder))
    fireEvent.mouseDown(rtl.getByText('Option 1'))
    
    expect(rtl.getByText('Option 1')).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledWith(data[0])
  })
})
