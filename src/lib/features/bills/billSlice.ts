import { Bill, BillState } from "@/app/interface";
import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : BillState = {
  bills: []
}

export const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers:{
    createBill: (state, action: PayloadAction<Bill>)  => {
      state.bills.push(action.payload)
    }
  }

})

export const {createBill} = billSlice.actions;

export const selectBills = (state: RootState) => state.bills

export default billSlice.reducer