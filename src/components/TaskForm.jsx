import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import { PlusCircle } from 'lucide-react';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        dispatch(addTask({ title }));
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
                <button
                    type="submit"
                    disabled={!title.trim()}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 active:scale-95 text-white rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    <PlusCircle size={20} />
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
