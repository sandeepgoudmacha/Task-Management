import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../redux/tasksSlice';
import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const handleStatusToggle = () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        dispatch(updateTask({ id: task.id, updates: { status: newStatus } }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editTitle.trim() && editTitle !== task.title) {
            dispatch(updateTask({ id: task.id, updates: { title: editTitle } }));
        }
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(task.id));
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.01 }}
            className={`group rounded-xl p-4 border transition-all duration-200 
                ${task.status === 'completed'
                    ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 opacity-75'
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-900'
                }`}
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleStatusToggle();
                    }}
                    className={`flex-shrink-0 transition-all duration-200 rounded-full p-1 ${task.status === 'completed'
                        ? 'text-green-500 hover:text-green-600 bg-green-50 dark:bg-green-900/10'
                        : 'text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10'
                        }`}
                >
                    {task.status === 'completed' ? (
                        <CheckCircle size={24} className="fill-current" />
                    ) : (
                        <Circle size={24} strokeWidth={2} />
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <form onSubmit={handleEditSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full px-2 py-1 text-base rounded border border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                                autoFocus
                                onBlur={handleEditSubmit}
                            />
                        </form>
                    ) : (
                        <span
                            className={`block text-base font-medium break-words transition-all duration-200 ${task.status === 'completed'
                                ? 'text-gray-400 dark:text-gray-500 line-through decoration-gray-300 dark:decoration-gray-600'
                                : 'text-gray-700 dark:text-gray-200'
                                }`}
                        >
                            {task.title}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(!isEditing);
                        }}
                        className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        title="Edit"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskItem;
