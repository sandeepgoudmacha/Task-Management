import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

const storedToken = localStorage.getItem('tm_token');
const storedUser = localStorage.getItem('tm_user');

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        return await api.login(credentials);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const signupUser = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {
        return await api.signup(userData);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken || null,
        isAuthenticated: !!storedToken,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('tm_token');
            localStorage.removeItem('tm_user');
        },
        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state) => { state.status = 'loading'; state.error = null; };
        const handleFulfilled = (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('tm_token', action.payload.token);
            localStorage.setItem('tm_user', JSON.stringify(action.payload.user));
        };
        const handleRejected = (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        };

        builder
            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, handleFulfilled)
            .addCase(loginUser.rejected, handleRejected)
            .addCase(signupUser.pending, handlePending)
            .addCase(signupUser.fulfilled, handleFulfilled)
            .addCase(signupUser.rejected, handleRejected);
    },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
