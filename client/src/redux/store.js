// since redux state lost alfter page reloading so for that we have to use persistReducer
// persist reducer save the data into localStorage by itself
import { combineReducers, configureStore } from "@reduxjs/toolkit"

//slices
import userReducer from "./slices/userSlice"
import listingReducer from "./slices/listingSlice"

const rootReducer = combineReducers({
    user: userReducer,
    listing: listingReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})
