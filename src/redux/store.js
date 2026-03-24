import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import themeReducer from './themeSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        theme: themeReducer,
        auth: authReducer,
    },
});
