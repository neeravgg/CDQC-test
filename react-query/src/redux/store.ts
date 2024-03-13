import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user.slice'
import familyReducer from './features/family.slice'
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userReducer,
        family: familyReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector