const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// @desc    Get all tasks (with filter, search, sort, pagination)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
    try {
        const { status, priority, search, sortBy = 'createdAt', order = 'desc', page = 1, limit = 8 } = req.query;

        const query = { user: req.user._id };

        if (status && status !== 'all') query.status = status;
        if (priority && priority !== 'all') query.priority = priority;
        if (search) query.title = { $regex: search, $options: 'i' };

        const sortOptions = {};
        if (sortBy === 'dueDate') sortOptions.dueDate = order === 'asc' ? 1 : -1;
        else if (sortBy === 'priority') {
            // Custom priority sort: high > medium > low
            sortOptions.priority = order === 'asc' ? 1 : -1;
        } else {
            sortOptions.createdAt = order === 'asc' ? 1 : -1;
        }

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
        const skip = (pageNum - 1) * limitNum;

        const [tasks, total] = await Promise.all([
            Task.find(query).sort(sortOptions).skip(skip).limit(limitNum),
            Task.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: tasks,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalTasks: total,
                limit: limitNum,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get analytics for current user
// @route   GET /api/tasks/analytics
// @access  Private
const getAnalytics = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const stats = await Task.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    done: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } },
                    todo: { $sum: { $cond: [{ $eq: ['$status', 'todo'] }, 1, 0] } },
                    inProgress: { $sum: { $cond: [{ $eq: ['$status', 'inProgress'] }, 1, 0] } },
                    high: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } },
                    medium: { $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] } },
                    low: { $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] } },
                },
            },
        ]);

        const data = stats[0] || { total: 0, done: 0, todo: 0, inProgress: 0, high: 0, medium: 0, low: 0 };
        const completionPercentage = data.total > 0 ? Math.round((data.done / data.total) * 100) : 0;

        res.status(200).json({
            success: true,
            data: { ...data, completionPercentage },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });
        }

        const { title, description, status, priority, dueDate } = req.body;
        const task = await Task.create({
            title,
            description,
            status: status || 'todo',
            priority: priority || 'medium',
            dueDate: dueDate || null,
            user: req.user._id,
        });

        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this task' });
        }

        const { title, description, status, priority, dueDate } = req.body;
        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, priority, dueDate },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });
        }

        await task.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

module.exports = { getTasks, getAnalytics, createTask, updateTask, deleteTask };
