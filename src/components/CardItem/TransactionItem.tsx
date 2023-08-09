import React from 'react';
import {ITransactionFullInfo} from "../../types";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {getTransactions, removeTransaction} from "../../store/transactionsThunk";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {selectRemoveTransactionLoading, setTransaction, showTransactionModal} from "../../store/transactionsSlice";

interface Props {
  transaction: ITransactionFullInfo;
}
const TransactionItem : React.FC<Props> = ({transaction}) => {
  const dispatch = useAppDispatch();
  const removeLoading = useAppSelector(selectRemoveTransactionLoading);

  let typeClassName : string[] = ['card-type'];
  if(transaction.type === 'income') {
    typeClassName.push('income');
  } else {
    typeClassName.push('expense');
  }

  const onDeleteClick = async (id: string) => {
    await dispatch(removeTransaction(id));
    await dispatch(getTransactions());
  };

  const onEditHandler = () => {
    dispatch(showTransactionModal(true));
    dispatch(setTransaction(transaction));
  };

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
              onClick={onEditHandler}
          >
            Edit
          </button>
          <button
              className="btn btn-delete"
              onClick={() => onDeleteClick(transaction.id)}
              disabled={removeLoading ? removeLoading === transaction.id : false}
          >
            {removeLoading && removeLoading === transaction.id && <ButtonSpinner/>}
            Delete
          </button>
        </div>
      </div>
  );
};

export default TransactionItem;