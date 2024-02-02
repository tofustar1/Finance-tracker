import {createSlice} from "@reduxjs/toolkit";
import {ITransaction} from "../types";
import {addTransaction, editTransaction, getTransactions, removeTransaction} from "./transactionsThunk";
import {RootState} from "../app/store";

interface TransactionsState {
  items: ITransaction[];
  item: ITransaction | null;
  getAllLoading: boolean;
  totalAmount: number;
  addLoading: boolean;
  removeLoading: boolean | string;
  isShowTransactionModal: boolean;
}

const initialState: TransactionsState = {
  items: [],
  item: null,
  getAllLoading: false,
  addLoading: false,
  totalAmount: 0,
  removeLoading: false,
  isShowTransactionModal: false,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    sumTotalAmount: (state) => {
      state.totalAmount = state.items.reduce((acc, val) => {
        return val.category.type === 'income' ? acc + val.amount : acc - val.amount;
      }, 0);
    },

    showTransactionModal: (state, action) => {
      state.isShowTransactionModal = action.payload;
    },

    setTransaction: (state, {payload : transaction}) => {
      state.item = transaction;
    },

    clearTransactionItem: (state) => {
      state.item = null;
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

    builder
        .addCase(removeTransaction.pending, (state, action) => {
          state.removeLoading = action.meta.arg;
        })
        .addCase(removeTransaction.fulfilled, (state) => {
          state.removeLoading = false;
        })
        .addCase(removeTransaction.rejected, (state) => {
          state.removeLoading = false;
        });

    builder
        .addCase(addTransaction.pending, (state) => {
          state.addLoading = true;
        })
        .addCase(addTransaction.fulfilled, (state) => {
          state.addLoading = false;
          state.isShowTransactionModal = false;
        })
        .addCase(addTransaction.rejected, (state) => {
          state.addLoading = false;
        });

    builder
        .addCase(editTransaction.pending, (state) =>{
          state.addLoading = true;
        })
        .addCase(editTransaction.fulfilled, (state) =>{
          state.addLoading = false;
          state.isShowTransactionModal = false;
        })
        .addCase(editTransaction.rejected, (state) =>{
          state.addLoading = false;
        })
  }
});


export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTransaction = (state: RootState) => state.transactions.item;
export const selectGetTransactionsLoading = (state: RootState) => state.transactions.getAllLoading;
export const selectTotalAmount = (state: RootState) => state.transactions.totalAmount;

export const selectRemoveTransactionLoading = (state: RootState) => state.transactions.removeLoading;

export const selectTransactionModal = (state: RootState) => state.transactions.isShowTransactionModal;

export const selectAddTransactionLoading = (state: RootState) => state.transactions.addLoading;

export const {sumTotalAmount, showTransactionModal, setTransaction, clearTransactionItem} = transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;