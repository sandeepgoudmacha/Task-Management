import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/tasksSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Pagination = () => {
    const dispatch = useDispatch();
    const { currentPage, totalPages, totalTasks } = useSelector((state) => state.tasks);

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800"
        >
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                <span className="ml-1">({totalTasks} tasks)</span>
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft size={16} />
                </button>

                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => dispatch(setCurrentPage(p))}
                        className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${p === currentPage
                            ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/30'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default Pagination;
