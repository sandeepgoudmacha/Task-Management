import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ListTodo, BarChart3, AlertCircle } from 'lucide-react';

const Analytics = () => {
    const { analytics, analyticsStatus } = useSelector((state) => state.tasks);

    if (analyticsStatus === 'loading') {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-5 animate-pulse border border-white/20 dark:border-gray-700">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-16"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (!analytics) return null;

    const { total, done, todo, inProgress, completionPercentage } = analytics;

    const stats = [
        {
            label: 'Total Tasks',
            value: total,
            icon: BarChart3,
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400',
        },
        {
            label: 'Todo',
            value: todo,
            icon: ListTodo,
            color: 'from-amber-500 to-orange-500',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            text: 'text-amber-600 dark:text-amber-400',
        },
        {
            label: 'In Progress',
            value: inProgress,
            icon: AlertCircle,
            color: 'from-violet-500 to-purple-500',
            bg: 'bg-violet-50 dark:bg-violet-900/20',
            text: 'text-violet-600 dark:text-violet-400',
        },
        {
            label: 'Completed',
            value: done,
            icon: CheckCircle2,
            color: 'from-emerald-500 to-green-500',
            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
            text: 'text-emerald-600 dark:text-emerald-400',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -2, scale: 1.02 }}
                            className={`${stat.bg} rounded-2xl p-4 md:p-5 border border-white/20 dark:border-gray-700 shadow-sm`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-semibold uppercase tracking-wider ${stat.text}`}>{stat.label}</span>
                                <div className={`bg-gradient-to-br ${stat.color} p-1.5 rounded-lg`}>
                                    <Icon className="text-white" size={14} />
                                </div>
                            </div>
                            <p className={`text-3xl font-black ${stat.text}`}>{stat.value}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Completion Progress Bar */}
            {total > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-700"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Overall Completion</span>
                        <span className="text-sm font-black text-primary-600 dark:text-primary-400">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completionPercentage}%` }}
                            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-indigo-600"
                        />
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Analytics;
