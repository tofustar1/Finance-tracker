import {createSlice} from "@reduxjs/toolkit";
import {IAlert} from "../types";
import {RootState} from "../app/store";

interface AlertState {
  alert: IAlert | null
}

const initialState: AlertState = {
  alert: null,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, {payload: alert}) =>  {
      state.alert = alert;
    },

    clearAlert: (state) => {
      state.alert = null;
    },
  }
});

export const selectAlert = (state: RootState) => state.alert.alert;

export const {setAlert, clearAlert} = alertSlice.actions;

export const alertReducer = alertSlice.reducer;