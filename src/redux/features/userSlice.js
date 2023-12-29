import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    role: null,
    isLogin: false,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
    debugger
        },
        
    },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
