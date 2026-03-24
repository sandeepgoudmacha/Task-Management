import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/tasksSlice';
import { X, PlusCircle, Save, Calendar, AlignLeft, Tag, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUSES = [
    { value: 'todo', label: 'Todo' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
];

const PRIORITIES = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-amber-600' },
    { value: 'high', label: 'High', color: 'text-red-600' },
];

const defaultForm = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' };

const TaskForm = ({ editTask = null, onClose = null }) => {
    const dispatch = useDispatch();
    const isEditing = !!editTask;
    const [isOpen, setIsOpen] = useState(isEditing);
    const [form, setForm] = useState(
        editTask
            ? {
                title: editTask.title,
                description: editTask.description || '',
                status: editTask.status,
                priority: editTask.priority,
                dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : '',
            }
            : defaultForm
    );

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        const payload = { ...form, dueDate: form.dueDate || null };
        if (isEditing) {
            dispatch(updateTask({ id: editTask._id, updates: payload }));
            onClose?.();
        } else {
            dispatch(addTask(payload));
            setForm(defaultForm);
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        if (isEditing) onClose?.();
        else { setForm(defaultForm); setIsOpen(false); }
    };

    if (!isEditing && !isOpen) {
        return (
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-primary-400 hover:text-primary-500 dark:hover:border-primary-600 dark:hover:text-primary-400 transition-all group mb-6"
            >
                <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium text-sm">Add new task...</span>
            </motion.button>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 ${isEditing ? '' : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm'}`}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <div className="relative">
                            <Tag className="absolute left-3 top-3.5 text-gray-400" size={16} />
                            <input
                                name="title"
                                type="text"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Task title *"
                                required
                                autoFocus
                                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <AlignLeft className="absolute left-3 top-3 text-gray-400" size={16} />
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description (optional)"
                            rows={2}
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Row: Status + Priority + Due Date */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Status</label>
                            <select name="status" value={form.status} onChange={handleChange}
                                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none text-sm transition-all">
                                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Priority</label>
                            <select name="priority" value={form.priority} onChange={handleChange}
                                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none text-sm transition-all">
                                {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Due Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange}
                                    className="w-full pl-8 pr-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none text-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={handleCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all flex items-center gap-1.5">
                            <X size={15} /> Cancel
                        </button>
                        <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={!form.title.trim()}
                            className="px-5 py-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center gap-1.5 transition-all shadow-md shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isEditing ? <><Save size={15} /> Save</> : <><PlusCircle size={15} /> Add Task</>}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </AnimatePresence>
    );
};

export default TaskForm;
