import React from 'react';
import MarkItem from './MarkItem';

const MarksList = ({ marks, onItemDelete, onMarkEdit }) => {
   return (
      <div>
        {marks.map(mark => <MarkItem key={mark.id} mark={mark} onItemDelete={onItemDelete} onMarkEdit={onMarkEdit} />)}
      </div>
   )
}

export default MarksList;
