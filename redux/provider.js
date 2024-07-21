// src/app/Providers.js
'use client';
import { Provider } from 'react-redux';
import { store } from './store'; // Ensure this path is correct

function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
}

export default Providers;
