import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery } from '../redux/tasksSlice';
import { Search } from 'lucide-react';

const TaskFilters = () => {
    const dispatch = useDispatch();
    const { filter, searchQuery } = useSelector((state) => state.tasks);

    const filters = [
        { value: 'all', label: 'All Tasks' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full sm:w-auto">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => dispatch(setFilter(f.value))}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === f.value
                                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    placeholder="Search tasks..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
            </div>
        </div>
    );
};

export default TaskFilters;
