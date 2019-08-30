import React from 'react';
import MarkItem from './MarkItem'

const MarksList = ({ marks, onItemDelete }) => {
   return (
      <div>
        {marks.map(mark => <MarkItem key={mark.id} mark={mark} onItemDelete={onItemDelete} />)}
      </div>
   )
}

export default MarksList;
