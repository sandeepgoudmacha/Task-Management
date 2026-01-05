
// Simulated delay to mimic network request
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEY = 'tm_tasks';

const getStoredTasks = () => {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
};

const setStoredTasks = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const api = {
    fetchTasks: async () => {
        await delay(500);
        // Initialize with some sample data if empty
        let tasks = getStoredTasks();
        if (tasks.length === 0) {
            tasks = [
                { id: '1', title: 'Complete Project Documentation', status: 'completed' },
                { id: '2', title: 'Review Pull Requests', status: 'pending' },
                { id: '3', title: 'Setup CI/CD Pipeline', status: 'pending' },
            ];
            setStoredTasks(tasks);
        }
        return tasks;
    },

    addTask: async (task) => {
        await delay(500);
        const tasks = getStoredTasks();
        const newTask = { ...task, id: crypto.randomUUID(), status: 'pending' };
        tasks.push(newTask);
        setStoredTasks(tasks);
        return newTask;
    },

    updateTask: async (id, updates) => {
        await delay(400);
        const tasks = getStoredTasks();
        const index = tasks.findIndex((t) => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            setStoredTasks(tasks);
            return tasks[index];
        }
        throw new Error('Task not found');
    },

    deleteTask: async (id) => {
        await delay(300);
        let tasks = getStoredTasks();
        tasks = tasks.filter((t) => t.id !== id);
        setStoredTasks(tasks);
        return id;
    },
};
