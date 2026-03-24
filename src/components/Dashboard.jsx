import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics } from '../redux/tasksSlice';
import { logout } from '../redux/authSlice';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import Analytics from './Analytics';
import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchAnalytics());
    }, [dispatch]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 perspective-1000">
            <motion.div
                initial={{ rotateX: 10, opacity: 0, y: 40 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/20 dark:border-gray-700 overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
            >
                {/* Header */}
                <div className="p-5 md:p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <motion.h1
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 tracking-tight"
                            >
                                My Tasks
                            </motion.h1>
                            <motion.p
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1"
                            >
                                Welcome back, <span className="text-gray-700 dark:text-gray-300 font-semibold">{user?.name}</span>
                            </motion.p>
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => dispatch(logout())}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all border border-gray-200 dark:border-gray-700"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Sign out</span>
                        </motion.button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-8 bg-gray-50/30 dark:bg-gray-900/30 min-h-[500px]">
                    {/* Analytics */}
                    <Analytics />

                    {/* Task Form */}
                    <TaskForm />

                    {/* Filters */}
                    <TaskFilters />

                    {/* Task List */}
                    <TaskList />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-12 mb-8 text-sm font-medium text-gray-400/80 dark:text-gray-500"
            >
                <p>TaskMaster — Built with React, Redux & Node.js</p>
            </motion.div>
        </div>
    );
};

export default Dashboard;
