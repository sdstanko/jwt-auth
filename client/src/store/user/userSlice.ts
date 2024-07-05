import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from '../../models/response/IUser';

// Define a type for the slice state
interface UserState extends IUser {
    isAuth: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
    email: '',
    id: '',
    isActivated: false,
    isAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state = { ...state, isAuth: action.payload };
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...action.payload };
        },

        clearUser: (state) => {
            state.email = '';
            state.id = '';
            state.isActivated = false;
            state.isAuth = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.users.value;

export default userSlice.reducer;
