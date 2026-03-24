import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../redux/tasksSlice';
import { Trash2, Edit2, CheckCircle, Circle, Clock, Calendar, X } from 'lucide-react';
import { motion } from 'framer-motion';
import TaskForm from './TaskForm';

const PRIORITY_CONFIG = {
    high: { label: 'High', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' },
    medium: { label: 'Medium', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
    low: { label: 'Low', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
};

const STATUS_CONFIG = {
    todo: { label: 'Todo', bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400' },
    inProgress: { label: 'In Progress', bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-600 dark:text-violet-400' },
    done: { label: 'Done', bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
};

const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = d < today;
    return { text: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), isPast };
};

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
    const statusCfg = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;
    const dueDate = formatDate(task.dueDate);
    const isDone = task.status === 'done';

    const cycleStatus = () => {
        const next = { todo: 'inProgress', inProgress: 'done', done: 'todo' };
        dispatch(updateTask({ id: task._id, updates: { status: next[task.status] } }));
    };

    const handleDelete = () => {
        if (confirm('Delete this task?')) dispatch(deleteTask(task._id));
    };

    if (isEditing) {
        return (
            <motion.div layout className="rounded-2xl border border-primary-200 dark:border-primary-800 bg-white dark:bg-gray-800 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Edit Task</span>
                    <button onClick={() => setIsEditing(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"><X size={16} /></button>
                </div>
                <TaskForm editTask={task} onClose={() => setIsEditing(false)} />
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            whileHover={{ y: -1 }}
            className={`group rounded-2xl border transition-all duration-200 p-4
                ${isDone
                    ? 'bg-gray-50/80 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 opacity-80'
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-900'
                }`}
        >
            <div className="flex items-start gap-3">
                {/* Status toggle */}
                <button
                    onClick={cycleStatus}
                    title="Click to advance status"
                    className={`flex-shrink-0 mt-0.5 transition-all duration-200 rounded-full p-0.5 ${isDone
                        ? 'text-emerald-500 hover:text-emerald-600'
                        : 'text-gray-300 hover:text-primary-500'
                        }`}
                >
                    {isDone ? <CheckCircle size={22} className="fill-current" /> : <Circle size={22} strokeWidth={2} />}
                </button>

                <div className="flex-1 min-w-0">
                    {/* Title */}
                    <p className={`font-semibold text-sm break-words ${isDone ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100'}`}>
                        {task.title}
                    </p>

                    {/* Description */}
                    {task.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-words line-clamp-2">{task.description}</p>
                    )}

                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {/* Priority badge */}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${priority.bg} ${priority.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></span>
                            {priority.label}
                        </span>

                        {/* Status badge */}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}>
                            {statusCfg.label}
                        </span>

                        {/* Due date */}
                        {dueDate && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${dueDate.isPast && !isDone
                                    ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                }`}>
                                <Calendar size={10} />
                                {dueDate.text}
                                {dueDate.isPast && !isDone && <span className="ml-0.5">(Overdue)</span>}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
                    <button onClick={() => setIsEditing(true)}
                        className="p-1.5 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Edit">
                        <Edit2 size={14} />
                    </button>
                    <button onClick={handleDelete}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors" title="Delete">
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskItem;
