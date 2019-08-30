import React from 'react';

const MarkItem = ({ mark }) => {
  const {lat, lng} = mark;
  return (
    <div>
      <div> lat: {lat} </div>
      <div> lng: {lng} </div>
    </div>
  )
}

export default MarkItem;
