import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../store'
import { Shutter, ShutterState } from "@/app/interface";

const initialState : ShutterState= {
  shutters: [{
    key: "raised_panel",
    type: "Raised Panel",
    price: 10
  },{
    key: "louvered",
    type: "Louvered",
    price: 10
  },{
    key: "board_and_batten",
    type: "Board and Batten",
    price: 10
  },{
    key: "bahama",
    type: "Bahama",
    price: 10
  },{
    key: "shutter_hardware",
    type: "Shutter Hardware",
    price: 10
  }]
}

export const shutterSlice = createSlice({

  name: "shutters",
  initialState,
  reducers: {
    addShutter: (state, action:   PayloadAction<Shutter>) => {
      state.shutters.push(action.payload);
    }
  }
})

export const {addShutter} = shutterSlice.actions;

export const selectShutters = (state: RootState) => state.shutterReducer

export default shutterSlice.reducer