import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {IEditTransaction, ITransaction, ITransactionMutation} from "../types";

export const getTransactions = createAsyncThunk<ITransaction[]>(
    'transactions/getAll',
    async () => {
        const response = await axiosApi<ITransaction[]>('/transactions');
        return response.data;
    }
);

export const addTransaction = createAsyncThunk<void, ITransactionMutation>(
    'transactions/add',
    async (transaction) => {
      await axiosApi.post(`/transactions`, transaction);
    }
);

export const editTransaction = createAsyncThunk<void, IEditTransaction>(
    'transactions/edit',
    async (params) => {
      await axiosApi.put(`transactions/${params.id}`, params.transaction);
    }
);

export const removeTransaction = createAsyncThunk<void, string>(
    'transactions/remove',
    async (id) => {
      await axiosApi.delete(`transactions/${id}`);
    }
);