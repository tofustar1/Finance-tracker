import {configureStore} from "@reduxjs/toolkit";
import {categoriesReducer} from "../store/categoriesSlice";
import {transactionsReducer} from "../store/transactionsSlice";
import {alertReducer} from "../store/alertSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;