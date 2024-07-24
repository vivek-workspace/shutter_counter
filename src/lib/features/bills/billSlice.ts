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
    },
    updateBill: (state, action: PayloadAction<{intId: number,data: Bill}>) => {
      state.bills[action.payload.intId] = action.payload.data
    },
    deleteBill: (state, action: PayloadAction<number>)  => {
      state.bills.splice(action.payload, 1)
    }
  }

})

export const {createBill, deleteBill, updateBill} = billSlice.actions;

export const selectBills = (state: RootState) => state.billReducer

export default billSlice.reducer