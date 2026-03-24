import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/tasksSlice';
import TaskItem from './TaskItem';
import Pagination from './Pagination';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const TaskList = () => {
    const dispatch = useDispatch();
    const { items, status, error, filter, priorityFilter, searchQuery, sortBy, sortOrder, currentPage } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks({
            status: filter,
            priority: priorityFilter,
            search: searchQuery,
            sortBy,
            sortOrder,
            page: currentPage,
        }));
    }, [filter, priorityFilter, searchQuery, sortBy, sortOrder, currentPage, dispatch]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <Loader2 className="animate-spin mb-3" size={32} />
                <p className="text-sm font-medium">Loading tasks...</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="text-center py-12 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
                <p className="text-red-500 font-medium">{error || 'Failed to load tasks.'}</p>
                <p className="text-sm text-gray-400 mt-1">Make sure the backend server is running.</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-1">No tasks found</h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                    {searchQuery ? `No tasks match "${searchQuery}"` : filter !== 'all' || priorityFilter !== 'all' ? 'No tasks match your filters.' : 'Get started by adding your first task!'}
                </p>
            </motion.div>
        );
    }

    return (
        <div>
            <div className="space-y-2.5">
                <AnimatePresence mode="popLayout" initial={false}>
                    {items.map((task) => (
                        <TaskItem key={task._id} task={task} />
                    ))}
                </AnimatePresence>
            </div>
            <Pagination />
        </div>
    );
};

export default TaskList;
