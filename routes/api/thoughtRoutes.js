const router = require('express').Router();

// Set requirements
const { 
    getAllThought, 
    getThoughtById, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

// Routes to: /api/Thought get
router.route('/').get(getAllThought);

// Routes to: /api/Thought/:id get, put, and delete
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought); 

// Routes to: /api/Thought/:userId post
router.route('/:userId').post(createThought);

// Routes to: /api/Thought/:thoughtId/reactions post
router.route('/:thoughtId/reactions').post(addReaction);

// Routes to: /api/Thought/:thoughtId/reactionId delete
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;