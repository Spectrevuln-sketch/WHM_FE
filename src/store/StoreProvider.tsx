"use client"
import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { persistStore } from "redux-persist";

persistStore(store);
const StoreProvider = ({children}: {children: React.ReactNode}) => {
  return (
   <Provider store={store}>{children}</Provider>
  )
}

export default StoreProvider