import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/tasksSlice';
import TaskItem from './TaskItem';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const TaskList = () => {
    const dispatch = useDispatch();
    const { items, status, filter, searchQuery } = useSelector((state) => state.tasks);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks());
        }
    }, [status, dispatch]);

    const filteredTasks = items.filter((task) => {
        // 1. Status Filter
        if (filter === 'completed' && task.status !== 'completed') return false;
        if (filter === 'pending' && task.status !== 'pending') return false;

        // 2. Search Filter
        if (searchQuery) {
            return task.title.toLowerCase().includes(searchQuery.toLowerCase());
        }

        return true;
    });

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Loader2 className="animate-spin mb-3" size={32} />
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="text-center py-12 text-red-500">
                <p>Failed to load tasks. Please try again.</p>
            </div>
        );
    }

    if (filteredTasks.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                    No tasks found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery
                        ? "No tasks match your search."
                        : filter !== 'all'
                            ? `You have no ${filter} tasks.`
                            : "Get started by creating a new task!"}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
                {filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TaskList;
