import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (params, { rejectWithValue }) => {
    try {
        return await api.fetchTasks(params);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const addTask = createAsyncThunk('tasks/addTask', async (task, { rejectWithValue }) => {
    try {
        return await api.addTask(task);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updates }, { rejectWithValue }) => {
    try {
        return await api.updateTask(id, updates);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
    try {
        await api.deleteTask(id);
        return id;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const fetchAnalytics = createAsyncThunk('tasks/fetchAnalytics', async (_, { rejectWithValue }) => {
    try {
        return await api.fetchAnalytics();
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        // Filters
        filter: 'all',
        priorityFilter: 'all',
        searchQuery: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
        // Pagination
        currentPage: 1,
        totalPages: 1,
        totalTasks: 0,
        // Analytics
        analytics: null,
        analyticsStatus: 'idle',
    },
    reducers: {
        setFilter: (state, action) => { state.filter = action.payload; state.currentPage = 1; },
        setPriorityFilter: (state, action) => { state.priorityFilter = action.payload; state.currentPage = 1; },
        setSearchQuery: (state, action) => { state.searchQuery = action.payload; state.currentPage = 1; },
        setSortBy: (state, action) => { state.sortBy = action.payload; state.currentPage = 1; },
        setSortOrder: (state, action) => { state.sortOrder = action.payload; state.currentPage = 1; },
        setCurrentPage: (state, action) => { state.currentPage = action.payload; },
        resetTasksState: (state) => {
            state.items = [];
            state.status = 'idle';
            state.currentPage = 1;
            state.analytics = null;
            state.analyticsStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data;
                state.currentPage = action.payload.pagination.currentPage;
                state.totalPages = action.payload.pagination.totalPages;
                state.totalTasks = action.payload.pagination.totalTasks;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.items.unshift(action.payload.data);
                state.totalTasks += 1;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.items.findIndex((t) => t._id === action.payload.data._id);
                if (index !== -1) state.items[index] = action.payload.data;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t._id !== action.payload);
                state.totalTasks = Math.max(0, state.totalTasks - 1);
            })
            .addCase(fetchAnalytics.pending, (state) => { state.analyticsStatus = 'loading'; })
            .addCase(fetchAnalytics.fulfilled, (state, action) => {
                state.analyticsStatus = 'succeeded';
                state.analytics = action.payload.data;
            })
            .addCase(fetchAnalytics.rejected, (state) => { state.analyticsStatus = 'failed'; });
    },
});

export const {
    setFilter, setPriorityFilter, setSearchQuery,
    setSortBy, setSortOrder, setCurrentPage, resetTasksState,
} = tasksSlice.actions;
export default tasksSlice.reducer;
