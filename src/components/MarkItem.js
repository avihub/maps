import React from 'react';

const MarkItem = ({ mark, onItemDelete }) => {
  const {lat, lng, id} = mark;
  return (
    <div>
      <span> lat: {lat} </span>
      <span> lng: {lng} </span>
      <button>edit</button>
      <button onClick={() => onItemDelete(id)}>delete</button>
    </div>
  )
}

export default MarkItem;
