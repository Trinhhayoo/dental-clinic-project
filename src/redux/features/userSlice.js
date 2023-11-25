import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    role: null,
    isLogin: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRegisterLogin: (state, action) => {
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.isLogin = true;
        },
        setLogout: (state) => {
            state.username = null;
            state.role = null;
            state.isLogin = false;
        },
    },
});

export const { setRegisterLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
