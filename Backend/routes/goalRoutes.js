const express = require('express');
const router = express.Router();
const { getGoal , setGoal , updateGoal , deleteGoal } = require('../controllers/goalController');

//protect middleware function
const protect = require('../middleware/authMiddleware');
//creating routes
router.route('/').get(protect, getGoal).post(protect, setGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);


//exporting router
module.exports = router;