import { configureStore } from '@reduxjs/toolkit'
import customerReducer from "./features/customers/customerSlice"
import shutterReducer from "./features/Shutters/shutterSlice"
import billReducer from "./features/bills/billSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      customers: customerReducer,
      shutters: shutterReducer,
      bills: billReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']