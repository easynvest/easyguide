import {css} from 'react-emotion'

const tagSelectedState = () => css`
  color: white;
  border-color: transparent;
  background: #6f1167;
`

export const labelBaseStyle = () => css`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #322828;
`

export const tagsWrapperBaseStyle = () => css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

export const tagBaseStyle = () => css`
  cursor: pointer;
  display: inline-block;
  margin: 0 8px;
  padding: 9px 12px;
  border: 1px solid #d8d8d8;
  font-size: 14px;
  color: #322828;
  background-color: white;
  border-radius: 3px;
  transition: background 120ms linear, color 80ms ease-in;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: white;
    border-color: transparent;
    background: #b130a6;
  }

  &:active {
    color: white;
    border-color: transparent;
    background: #87027b;
  }
`

export const tagSelectedStyle = ({selected}) => selected && tagSelectedState()
