import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ScreenState {
    value: boolean;
}

const initialState: ScreenState = {
    value: false
}

export const screenSizeSlice = createSlice({
    name: 'screenSize',
    initialState,
    reducers: {
        setSize: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
})

export const getScreenSize = (state: RootState) => state.screenSize.value;

export default screenSizeSlice.reducer;