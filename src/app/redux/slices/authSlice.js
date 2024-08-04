import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        register: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        changePassword: (state, action) => {
            // This is an example, you may want to handle password changes differently
            // Typically, this would involve a server-side operation
            console.log('Password change request:', action.payload);
        },
    },
});

export const { login, logout, register, updateUser, changePassword } = authSlice.actions;

export default authSlice;
