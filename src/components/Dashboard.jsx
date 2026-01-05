import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import { motion } from 'framer-motion';

const Dashboard = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 perspective-1000">
            <motion.div
                initial={{ rotateX: 10, opacity: 0, y: 40 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/20 dark:border-gray-700 overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
            >
                {/* Header Section */}
                <div className="p-5 md:p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50">
                    <motion.h1
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 mb-2 tracking-tight"
                    >
                        My Tasks
                    </motion.h1>
                    <motion.p
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base"
                    >
                        Focus, prioritize, and execute.
                    </motion.p>
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-8 bg-gray-50/30 dark:bg-gray-900/30 min-h-[500px]">
                    <TaskForm />

                    <div className="mt-8">
                        <TaskFilters />
                        <div className="mt-6">
                            <TaskList />
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-12 mb-8 text-sm font-medium text-gray-400/80 dark:text-gray-500"
            >
                <p>Designed with React 19 & Framer Motion</p>
            </motion.div>
        </div>
    );
};

export default Dashboard;
