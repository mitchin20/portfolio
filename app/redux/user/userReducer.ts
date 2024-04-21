import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    }
})

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

