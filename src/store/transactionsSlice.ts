import {createSlice} from "@reduxjs/toolkit";
import {ITransactionFullInfo} from "../types";
import {getTransactions} from "./transactionsThunk";
import {RootState} from "../app/store";
import transactions from "../containers/Transactions/Transactions";

interface TransactionsState {
  items: ITransactionFullInfo[];
  getAllLoading: boolean;
  totalAmount: number;
}

const initialState: TransactionsState = {
  items: [],
  getAllLoading: false,
  totalAmount: 0,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    sumTotalAmount: (state) => {
      state.totalAmount = state.items.reduce((acc, val) => {
        return val.type === 'income' ? acc + val.amount : acc - val.amount;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getTransactions.pending, (state) => {
          state.getAllLoading = true;
        })
        .addCase(getTransactions.fulfilled, (state, action) => {
          state.getAllLoading = false;
          state.items = action.payload;
        })
        .addCase(getTransactions.rejected, (state) => {
          state.getAllLoading = false;
        });
  }
});


export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectGetTransactionsLoading = (state: RootState) => state.transactions.getAllLoading;
export const selectTotalAmount = (state: RootState) => state.transactions.totalAmount;

export const {sumTotalAmount} = transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;