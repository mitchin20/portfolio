import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
    user: object | null;
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{user: object}>) => {
            state.user = action.payload.user;
        },
        clearUser: (state, action: PayloadAction<{user: object}>) => {
            state.user = null;
        }
    }
})

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

