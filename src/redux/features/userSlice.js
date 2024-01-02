import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    role: null,
    isLogin: false,
    token: null,
    isPatient: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isLogin = true;

        },
        setUser: (state, action) => {
            state.username = action.payload.username;

        },
        setPatient: (state, action) => {
            state.isPatient = true;

        },
        setRole: (state, action) => {

            state.role = action.payload?.role;
        }


    },
});

export const { setToken, setUser, setPatient,setRole } = userSlice.actions;

export default userSlice.reducer;




