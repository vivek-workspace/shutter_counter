import { combineReducers, configureStore } from '@reduxjs/toolkit'
import customerReducer from "./features/customers/customerSlice"
import shutterReducer from "./features/Shutters/shutterSlice"
import billReducer from "./features/bills/billSlice"
import storage from 'redux-persist/lib/storage';
import { FLUSH, Persistor, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
  key: "root",
  storage
}

const rootReducer = combineReducers({billReducer, shutterReducer, customerReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  let store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck:false}),
  })
  let persistedStore :Persistor = persistStore(store)

  return {store, persistedStore}
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["store"]["getState"]>
export type AppDispatch = AppStore["store"]["dispatch"]