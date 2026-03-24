const express = require('express');
const { body } = require('express-validator');
const { getTasks, getAnalytics, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const taskValidation = [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title too long'),
    body('status').optional().isIn(['todo', 'inProgress', 'done']).withMessage('Invalid status'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
];

// All task routes are protected
router.use(protect);

router.get('/analytics', getAnalytics);
router.route('/').get(getTasks).post(taskValidation, createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
