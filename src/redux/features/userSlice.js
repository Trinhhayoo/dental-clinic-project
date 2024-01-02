import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    role: null,
    isLogin: false,
    token: null,
    isPatient: false,
    user_id: null,
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
            state.username = action.payload;

        },
        setPatient: (state, action) => {
            state.isPatient = true;

        },
        setRole: (state, action) => {

            state.role = action.payload;
           
        },
        setUserId:(state,action) => {
            state.user_id = action.payload;
        }



    },
});

export const { setToken, setUser, setPatient,setRole, setUserId } = userSlice.actions;

export default userSlice.reducer;




