import {css} from 'react-emotion'

export const inputBaseStyle = () => css`
  padding: 5px 0;
  color: #322828;
  box-sizing: border-box;
  border-bottom: 1px solid #9B9B9B;
`

export const customSelectStyle = () => css`
  font-size: 16px;
  color: #322828;
  cursor: pointer;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const inputStyle = () => css`
  border: none;
  outline: none;
  font-size: 16px;
  color: #322828;

  &::-webkit-input-placeholder {
    color: #322828;
  }

  &::-moz-placeholder {
    color: #322828;
  }

  &:-ms-input-placeholder {
    color: #322828;
  }

  &:-moz-placeholder {
    color: #322828;
  }
`

export const inputWrapperStyle = () => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  outline: none;

  & > *:first-child {
    flex: 1 1 auto;
  }
`

export const selectWrapperStyle = () => css`
  position: relative;
  width: 100%;
  outline: none;
`

export const dropdownStyle = () => css`
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 1;
  padding: 0;
  width: 100%;
  list-style: none;
  border: 0.5px solid #ADADAD;
  background: white;
  border-radius: 1px;
  box-shadow: 0 1px 0 0 rgba(0,0,0,0.06);

  &::before {
    content: '';
    position: absolute;
    top: -16px;
    right: calc(50% - 8px);
    width: 0;
    height: 0;
    border-bottom: 8px solid #ADADAD;
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }

  &::after {
    content: '';
    position: absolute;
    top: -13px;
    right: calc(50% - 8px);
    margin-right: 2px;
    width: 0;
    height: 0;
    border-bottom: 6px solid white;
    border-top: 6px solid transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    margin-top: 1px;
  }
`

export const dropdownWrapperStyle = () => css`
  padding: 7px 0;
  max-height: 200px;
  overflow-y: auto;
`

export const dropdownItemStyle = () => css`
  display: block;
  max-width: 100%;
  padding: 5px 15px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;
  color: #322828;

  &:hover {
    color: #B130A6;
  }
`

export const emptyListStyle = () => css`
  padding: 7px 0;
  text-align: center;
  color: #322828;
  font-size: 14px;
`

export const arrowStyle = () => css`
  width: 14px;
  height: 13px;
  transition: 0.2s ease;
  transform: rotate(0);
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    transition: 0.2s ease;
    width: 2px;
    height: 3px;
    display: inline-block;
    position: absolute;
    border-bottom: 9px solid #87027b;
    transform: rotate(0);
    top: 0px;
    left: 9px;
  }

  &:before {
    transform: rotate(-135deg);
  }
  
  &:after {
    transform: rotate(135deg);
    left: 5px;
  }
`

export const arrowOpenStyle = ({ isOpen }) => isOpen && css`
  transform: rotate(0);
  transform: translate(0, -6px);

  &:before {
    transform: rotate(-45deg);
  }

  &:after {
    transform: rotate(45deg);
  }
`

export const withLinkStyle = () => css`
  padding: 0 15px;
`
