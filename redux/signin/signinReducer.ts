import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SignIn {
    success: boolean | null;
    message: string | null;
    user: object | null;
}

interface SignInState {
    signIn: SignIn | null;
}

const initialState: SignInState = {
    signIn: null
}

export const signInSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setSignInState: (state, action: PayloadAction<SignIn | null>) => {
            state.signIn = action.payload;
        },
        clearSignInState: () => {
            return initialState;
        }
    }
})

export const getSignInState = (state: RootState) => state.signInData.signIn;

export default signInSlice.reducer;