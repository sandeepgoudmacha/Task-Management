const BASE_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('tm_token');

const request = async (endpoint, options = {}) => {
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...options,
    };

    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};

export const api = {
    // Auth
    signup: (userData) =>
        request('/auth/signup', { method: 'POST', body: JSON.stringify(userData) }),

    login: (credentials) =>
        request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),

    getMe: () => request('/auth/me'),

    // Tasks
    fetchTasks: ({ status, priority, search, sortBy, sortOrder, page } = {}) => {
        const params = new URLSearchParams();
        if (status && status !== 'all') params.append('status', status);
        if (priority && priority !== 'all') params.append('priority', priority);
        if (search) params.append('search', search);
        if (sortBy) params.append('sortBy', sortBy);
        if (sortOrder) params.append('order', sortOrder);
        if (page) params.append('page', page);
        const qs = params.toString();
        return request(`/tasks${qs ? `?${qs}` : ''}`);
    },

    addTask: (task) =>
        request('/tasks', { method: 'POST', body: JSON.stringify(task) }),

    updateTask: (id, updates) =>
        request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),

    deleteTask: (id) =>
        request(`/tasks/${id}`, { method: 'DELETE' }),

    fetchAnalytics: () => request('/tasks/analytics'),
};
