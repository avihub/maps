import React from 'react';

const TextField = ({label, name, value, onChange}) => {
  return (
    <div>
      {label && <label>{label}:</label>}
      <input
        type='text'
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextField;