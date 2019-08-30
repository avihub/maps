import React from 'react';
import MarkItem from './MarkItem'

const MarksList = ({ marks }) => {
   return (
      <div>
        {marks.map(mark => <MarkItem key={mark.markId} mark={mark} />)}
      </div>
   )
}

export default MarksList;
