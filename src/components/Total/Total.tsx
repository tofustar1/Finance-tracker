import React from 'react';
import {useAppSelector} from "../../app/hook";
import {selectTotalAmount} from "../../store/transactionsSlice";
import './Total.css';

const Total = () => {
  const totalAmount = useAppSelector(selectTotalAmount);
  return (
      <div className="total">
        <b>Total: </b>
        <span
            className="total-num"
            style={{color: totalAmount > 0 ? 'green' : 'red'}}
        >
          {totalAmount}
        </span>
      </div>
  );
};

export default Total;