import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface User {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: string | null;
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

export const getUser = (state: RootState) => state.userData.user;

export default userSlice.reducer;

