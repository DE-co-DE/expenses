import React from 'react';

const Checkbox = ({checkRow,row}) => {

  return (
    <React.Fragment>
      <input type="checkbox" onChange={(Event)=>checkRow(Event.target.checked,row)} />
    </React.Fragment>
  );
};

export default Checkbox;