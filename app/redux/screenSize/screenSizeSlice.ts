import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define type for slice state
export interface ScreenState {
    value: boolean
}

// Define initial state using type
const initialState: ScreenState = {
    value: false
}

const screenSizeSlice = createSlice({
    name: 'screenSize',
    initialState,
    reducers: {
        setIsSmall: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
})

export const { setIsSmall } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;