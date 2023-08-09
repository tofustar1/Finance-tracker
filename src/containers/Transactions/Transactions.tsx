import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {getTransactions} from "../../store/transactionsThunk";
import {
  selectGetTransactionsLoading,
  selectTotalAmount,
  selectTransactions,
  sumTotalAmount
} from "../../store/transactionsSlice";
import Spinner from "../../components/Spinner/Spinner";
import TransactionItem from "../../components/CardItem/TransactionItem";
import Total from "../../components/Total/Total";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const loading = useAppSelector(selectGetTransactionsLoading);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getTransactions());
      dispatch(sumTotalAmount());
    };

    void getData();
  }, [dispatch]);

  return (
      <>
        {
          loading ?
              <Spinner/>
              :
              <>
                <Total/>
                {
                  transactions.map(transaction => (
                      <TransactionItem key={transaction.id} transaction={transaction}/>
                  ))
                }
              </>
        }
      </>
  );
};

export default Transactions;