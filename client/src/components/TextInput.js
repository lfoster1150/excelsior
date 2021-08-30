import React from 'react'

const TextInput = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <button type="submit">{props.name}</button>
    </form>
  )
}

export default TextInput
