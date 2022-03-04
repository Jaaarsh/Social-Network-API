const router = require('express').Router();

const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// add `/users` to created routes 
router.use('/users', userRoutes);

// add `/thoughts` to created routes 
router.use('/thoughts', thoughtRoutes);

module.exports = router;