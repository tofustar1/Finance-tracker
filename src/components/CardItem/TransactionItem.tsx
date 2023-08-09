import React from 'react';
import {ITransactionFullInfo} from "../../types";
import dayjs from "dayjs";

interface Props {
  transaction: ITransactionFullInfo;
}
const TransactionItem : React.FC<Props> = ({transaction}) => {

  let typeClassName : string[] = ['card-type'];
  if(transaction.type === 'income') {
    typeClassName.push('income');
  } else {
    typeClassName.push('expense');
  }

  return (
      <div className="card-item">
        <div className="card-inner">
          <span className="card-time">{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
          <h5 className="card-name">{transaction.category}</h5>
        </div>
        <div>
          <span
              className={typeClassName.join(' ')}
          >
            {transaction.type === 'income' ? '+' : '-'}
            {transaction.amount}
          </span>
          <button
              className="btn btn-edit"
              // onClick={onEditHandler}
          >
            Edit
          </button>
          <button
              className="btn btn-delete"
              // onClick={() => onDeleteClick(category.id)}
              // disabled={removeLoading ? removeLoading === category.id : false}
          >
            {/*{removeLoading && removeLoading === category.id && <ButtonSpinner/>}*/}
            Delete
          </button>
        </div>
      </div>
  );
};

export default TransactionItem;