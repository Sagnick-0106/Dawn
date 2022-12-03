import React from 'react';

export default function TextInput(props) {
  const onChange = (event) => {
    const value = event.target.value;
    props.setValue(value);
  };

  return (
    <label>
      {props.label}
      <input
        value={props.value}
        onChange={onChange}
        type={props.type || 'text'}
        name={props.name}
      />
    </label>
  )
};
