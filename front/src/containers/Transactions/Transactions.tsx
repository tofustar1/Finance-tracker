import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {getTransactions} from "../../store/transactionsThunk";
import {getCategories} from "../../store/categoriesThunk";
import {
  selectGetTransactionsLoading,
  selectTotalAmount,
  selectTransactions,
  sumTotalAmount
} from "../../store/transactionsSlice";
import Spinner from "../../components/Spinner/Spinner";
import TransactionItem from "../../components/CardItem/TransactionItem";
import Total from "../../components/Total/Total";
import TransactionModal from "../../components/Modal/TransactionModal";
import Alert from "../../components/Alert/Alert";
const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const totalAmount = useAppSelector(selectTotalAmount);
  const loading = useAppSelector(selectGetTransactionsLoading);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sumTotalAmount());
  }, [dispatch, transactions]);


  return (
      <>
        <h2>Transactions</h2>
        {
          loading ?
              <Spinner/>
              :
              <>
                <Total total={totalAmount}/>
                {
                  transactions.length > 0 ?
                      transactions.map(transaction => (
                          <TransactionItem key={transaction._id} transaction={transaction}/>
                      )) :
                      <div className="alert alert-dark w-25" role="alert">
                        No transactions yet!
                      </div>
                }
              </>
        }
        <TransactionModal/>
        <Alert/>
      </>
  );
};

export default Transactions;