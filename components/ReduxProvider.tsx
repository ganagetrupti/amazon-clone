"use client"
import { store } from "@/redux"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
//import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

export const ReduxProvider = ({children} : {children : React.ReactNode}) => {
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            {children}
            </PersistGate>
            
        </Provider>

    )

}