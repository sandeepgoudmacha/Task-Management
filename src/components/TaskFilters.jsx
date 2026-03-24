import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setPriorityFilter, setSearchQuery, setSortBy, setSortOrder } from '../redux/tasksSlice';
import { Search, ArrowUpDown } from 'lucide-react';

const STATUS_FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'todo', label: 'Todo' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
];

const PRIORITY_FILTERS = [
    { value: 'all', label: 'All Priority' },
    { value: 'high', label: '🔴 High' },
    { value: 'medium', label: '🟡 Medium' },
    { value: 'low', label: '🟢 Low' },
];

const SORT_OPTIONS = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
];

const TaskFilters = () => {
    const dispatch = useDispatch();
    const { filter, priorityFilter, searchQuery, sortBy, sortOrder } = useSelector((state) => state.tasks);

    return (
        <div className="space-y-3 mb-6">
            {/* Row 1: Search + Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        placeholder="Search tasks by title..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm"
                    />
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                        <select
                            value={sortBy}
                            onChange={(e) => dispatch(setSortBy(e.target.value))}
                            className="pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none text-sm appearance-none cursor-pointer"
                        >
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
                        className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 text-sm font-medium transition-all"
                        title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                    >
                        {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
                    </button>
                </div>
            </div>

            {/* Row 2: Status + Priority filters */}
            <div className="flex flex-wrap gap-2">
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    {STATUS_FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => dispatch(setFilter(f.value))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f.value
                                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    {PRIORITY_FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => dispatch(setPriorityFilter(f.value))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${priorityFilter === f.value
                                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;
