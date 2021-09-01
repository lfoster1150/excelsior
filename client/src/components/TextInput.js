import React from 'react'

const TextInput = (props) => {
  return (
    <input
      className="text-input"
      name={props.name}
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}

export default TextInput
