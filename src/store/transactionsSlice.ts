import {createSlice} from "@reduxjs/toolkit";

interface TransactionsState {

}

const initialState: TransactionsState = {

}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
});


export const transactionsReducer = transactionsSlice.reducer;