import React from 'react';
import './button.css';

export default function TextInput(props) {
  const onClick = (event) => {
    event.preventDefault();
    props.onClick(event);
  };

  return (
    <button
      className="button-field"
      onClick={onClick}
    >
      {props.children}
    </button>
  )
};
