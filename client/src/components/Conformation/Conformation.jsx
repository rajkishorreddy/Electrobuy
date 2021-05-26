import React from 'react';

const Conformation = (props) => {
  return <div>{props.match.params.id}</div>;
};

export default Conformation;
