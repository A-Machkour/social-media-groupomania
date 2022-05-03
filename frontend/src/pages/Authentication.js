import React from 'react';
import Log from '../components/Log';

const Authentication = () => {
  return (
    <div>
      <Log signin={true} signup={false}/>
    </div>
  );
}

export default Authentication;