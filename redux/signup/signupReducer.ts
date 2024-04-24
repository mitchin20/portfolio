import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SignUp {
    success: boolean | null;
    message: string | null;
}

interface SignUpState {
    signUp: SignUp | null;
}

const initialState: SignUpState = {
    signUp: null,
}

export const signUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setSignUpState: (state, action: PayloadAction<SignUp | null>) => {
            state.signUp = action.payload;
        },
        clearSignUpState: () => {
            return initialState;
        }
    }
})

export const getSignUpState = (state: RootState) => state.signUpData.signUp;

export default signUpSlice.reducer;