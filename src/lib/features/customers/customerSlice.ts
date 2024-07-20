import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { Customer, CustomerState } from '@/app/interface'


// Define the initial state using that type
const initialState: CustomerState = {
  customers: [{
    id: "4yd8s5s19r",
    name: "Aayush",
    email: "aayush@gmail.com",
    phoneNumber: "8754215487",
    address: "Ahmedabad"
  }]
}

export const customerSlice = createSlice({
  name: 'customers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload)
    },
   
  }
})

export const { addCustomer } = customerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCustomers = (state: RootState) => state.customers

export default customerSlice.reducer