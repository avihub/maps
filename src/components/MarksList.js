import React from 'react';
import MarkItem from './MarkItem'

const MarksList = ({ marks }) => {
   return (
      <div>
        {marks.map((mark, i) => <MarkItem key={i} mark={mark} />)}
      </div>
   )
}

export default MarksList;
