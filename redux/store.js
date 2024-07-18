// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

const makeStore = () =>
    configureStore({
        reducer: {
            auth: authReducer,
            cart: cartReducer,
        },
    });

export const wrapper = createWrapper(makeStore);
