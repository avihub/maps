import React from 'react';
import {uniqueId} from '../../utils';

const RadioField = ( {name, selectedValue, onChange, radios} ) => {
  return (
    <div className={'RadioField'} onChange={onChange}>
      {radios.map(( {value, label} ) => {
        const id = `${value}-${uniqueId()}`;
        return (
          <div key={id}>
            <input
              type='radio'
              name={name}
              value={value}
              id={id}
              checked={selectedValue === value}
              readOnly={true}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        )
      })}
    </div>
  )
}

export default RadioField;