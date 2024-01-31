import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {IEditTransaction, ITransaction, ITransactionFullInfo, ITransactionMutation, ITransactionsList} from "../types";
import {AppDispatch, RootState} from "../app/store";
import {getCategories} from "./categoriesThunk";

export const getTransactions = createAsyncThunk<ITransactionFullInfo[], undefined, {dispatch: AppDispatch, state: RootState}>(
    'transactions/getAll',
    async (_, thunkAPI) => {
        await thunkAPI.dispatch(getCategories());
        const categories = thunkAPI.getState().categories.items;
        const response = await axiosApi<ITransactionsList | null>('transactions.json');
        const transactions = response.data;

        let newTransactions: ITransaction[] = [];

        if(transactions) {
            newTransactions = Object.keys(transactions).map((key) => {
                return {...transactions[key], id: key}
            });
        }

        let transactionsFullInfo: ITransactionFullInfo[] = [];

        newTransactions.forEach(transaction => {
          const category = categories.find((category) => transaction.category === category.id);

          if(category) {
            transactionsFullInfo.push({
              id: transaction.id,
              amount: transaction.amount,
              createdAt: transaction.createdAt,
              category: category.name,
              type: category.type
            });
          }
        });

      transactionsFullInfo.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return transactionsFullInfo;
    }
);

export const addTransaction = createAsyncThunk<void, ITransactionMutation>(
    'transactions/add',
    async (transaction) => {
      await axiosApi.post(`transactions.json`, transaction);
    }
);

export const editTransaction = createAsyncThunk<void, IEditTransaction>(
    'transactions/edit',
    async (params) => {
      await axiosApi.put(`transactions/${params.id}.json`, params.transaction);
    }
);

export const removeTransaction = createAsyncThunk<void, string>(
    'transactions/remove',
    async (id) => {
      await axiosApi.delete(`transactions/${id}.json`);
    }
);