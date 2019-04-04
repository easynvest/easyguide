import React, {Component, Fragment} from 'react'
import isEqual from 'lodash.isequal'
import isEmpty from 'lodash.isempty'
import {safe} from 'crocks'
import PropTypes from 'prop-types'
import slug from 'slug'
import {
  InputWrapper,
  InputField,
  Arrow,
  SelectWrapper,
  DropdownWrapper,
  Dropdown,
  DropdownItem,
  EmptyList,
  CustomItemWrapper,
  CustomSelectValue,
} from './elements'

const validateShowInput = x => x === true

class Select extends Component {
  state = {
    isOpen: false,
    searchValue: '',
    selectedItem: this.props.selectedItem,
    cloneItem: this.props.selectedItem,
  }

  componentDidUpdate() {
    this.onUpdate()
  }

  onUpdate = () => {
    if(isEmpty(this.state.selectedItem) || isEmpty(this.props.selectedItem)) return
    if(!isEqual(this.state.selectedItem, this.props.selectedItem)) {
      this.setState({ 
        selectedItem: this.props.selectedItem,
        cloneItem: this.props.selectedItem
      })  
    }
  }

  toggle = e => {
    e.stopPropagation()
    const {selectedItem, isOpen} = this.state
    const {liveSearch} = this.props

    if (isOpen && !liveSearch) {
      this.close()

      return;
    }

    this.setState({
      isOpen: true,
      selectedItem: liveSearch ? {} : selectedItem
    })
  }

  close = () => {
    const {liveSearch} = this.props
    const {cloneItem, selectedItem} = this.state

    if (liveSearch && !selectedItem.value) {
      this.setState({
        isOpen: false,
        selectedItem: cloneItem,
        searchValue: ''
      })

      return
    }

    this.setState({ isOpen: false })
  }

  makeSlug = value => slug(value, { lower: true })

  filterItem = item => {
    const {liveSearch} = this.props
    const {searchValue} = this.state

    if (!liveSearch) {
      return item
    }

    return this
      .makeSlug(Object.values(item).join(' '))
      .includes(this.makeSlug(searchValue))
  }

  selectItem = item => {
    const {onChange} = this.props

    this.setState({
      isOpen: false,
      selectedItem: item,
      cloneItem: item
    }, () => {
      onChange(item)
    })
  }

  renderSelect = () => {
    const {selectedItem, isOpen} = this.state
    const {liveSearch, placeholder, render} = this.props
    const showInput = liveSearch && !selectedItem.value
    const customSelect = safe(validateShowInput, showInput)
      .map(() =>
        <InputField
          key
          type="text"
          autoFocus={isOpen}
          value={this.state.searchValue}
          onFocus={this.toggle}
          placeholder={placeholder}
          onChange={event => this.setState({ searchValue: event.target.value })}
        />
      )
      .option(
        <CustomSelectValue>
          {selectedItem.value ? render(selectedItem) : placeholder}
        </CustomSelectValue>
      )

    return (
      <Fragment>
        {customSelect}
        <Arrow isOpen={isOpen} />
      </Fragment>
    )
  }

  render() {
    const {isOpen} = this.state
    const data = this.props.data.filter(this.filterItem)
    const {
      className,
      renderCustomListItem,
      renderListItem,
      emptyListText,
    } = this.props

    return (
      <SelectWrapper className={className}>
        <InputWrapper
          tabIndex={0}
          onClick={this.toggle}
          onBlur={this.close}
        >
          {this.renderSelect()}
        </InputWrapper>
        {isOpen && (
          <Dropdown>
            <DropdownWrapper>
              {data.map(item =>
                <DropdownItem key={item.key} onMouseDown={() => this.selectItem(item)}>
                  {renderListItem(item)}
                </DropdownItem>
              )}
              {!data.length && (
                <EmptyList>{emptyListText}</EmptyList>
              )}
              {renderCustomListItem && (
                <CustomItemWrapper>{renderCustomListItem()}</CustomItemWrapper>
              )}
            </DropdownWrapper>
          </Dropdown>
        )}
      </SelectWrapper>
    )
  }
}

Select.propTypes = {
  liveSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  renderListItem: PropTypes.func,
  renderCustomListItem: PropTypes.func,
  render: PropTypes.func,
  emptyListText: PropTypes.string,
  selectedItem: PropTypes.object,
  data: PropTypes.array
}

Select.defaultProps = {
  liveSearch: false,
  selectedItem: {},
  onChange: () => null,
  render: item => item.value,
  renderListItem: item => item.value,
  placeholder: 'Selecione uma opção',
  emptyListText: 'Não foram encontrados resultados',
}

export default Select
