import React from 'react';
import Backdrop from "../Backdrop/Backdrop";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectTransaction, selectTransactionModal, showTransactionModal} from "../../store/transactionsSlice";
import TransactionForm from "../TransactionForm/TransactionForm";
import {ITransactionMutation} from "../../types";
import {addTransaction, editTransaction, getTransactions} from "../../store/transactionsThunk";
import {setAlert} from "../../store/alertSlice";

const TransactionModal = () => {
  const dispatch = useAppDispatch();
  const transactionModal = useAppSelector(selectTransactionModal);
  const transaction = useAppSelector(selectTransaction);

  const onSubmit = async (newTransaction: ITransactionMutation) => {
    if (transaction) {
      await dispatch(editTransaction({
        id: transaction._id,
        transaction: newTransaction
      }));
      dispatch(setAlert({
        message: 'Category successfully edited',
        type: 'success'
      }));
    } else {
      await dispatch(addTransaction(newTransaction));
      dispatch(setAlert({
        message: 'Category successfully added',
        type: 'success'
      }));
    }
    await dispatch(getTransactions());
  };

  return (
      <>
        <Backdrop show={transactionModal} />
        <div
            className="modal show"
            style={{display: transactionModal ? 'block' : 'none'}}
            onClick={() => dispatch(showTransactionModal(false))}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">{'Add Transaction'}</h1>
              </div>
              <div className="modal-body">
                <TransactionForm transaction={transaction} onSubmit={onSubmit}/>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default TransactionModal;