import React from 'react';
import './Total.css';

interface Props {
  total: number;
}
const Total : React.FC<Props> = ({total}) => {

  return (
      <div className="total">
        <b>Total: </b>
        <span
            className="total-num"
            style={{color: total > 0 ? 'green' : 'red'}}
        >
          {total}
        </span>
      </div>
  );
};

export default Total;