import React from 'react'

const TextInput = (props) => {
  return (
    <form>
      <input
        name={props.name}
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </form>
  )
}

export default TextInput
