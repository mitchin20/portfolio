import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import screenSizeReducer from './screenSize/screenSizeReducer';
import userReducer from './user/userReducer';
import signupReducer from './signup/signupReducer';
import signinReducer from './signin/signinReducer';

export const store = configureStore({
    reducer: {
        screenSize: screenSizeReducer,
        userData: userReducer,
        signUpData: signupReducer,
        signInData: signinReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>