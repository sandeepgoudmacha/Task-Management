import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    return await api.fetchTasks();
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    return await api.addTask(task);
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updates }) => {
    return await api.updateTask(id, updates);
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    return await api.deleteTask(id);
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
        filter: 'all', // all | completed | pending
        searchQuery: '',
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Tasks
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add Task
            .addCase(addTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update Task
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.items.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Delete Task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter((task) => task.id !== action.payload);
            });
    },
});

export const { setFilter, setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;
