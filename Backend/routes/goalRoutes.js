const express = require('express');
const router = express.Router();
const { getGoal , setGoal , updateGoal , deleteGoal } = require('../controllers/goalController');


//creating routes
router.route('/').get(getGoal).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);


//exporting router
module.exports = router;