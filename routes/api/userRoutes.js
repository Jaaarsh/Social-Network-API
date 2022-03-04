const router = require('express').Router();

// Set requirements
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController');

// Route to: /api/users get and post
router.route('/').get(getAllUsers).post(createUser);

// -- Route to: /api/users/:id get, put, and delete
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// -- Route to: /api/users/:userId/friends/:friendId post and delete
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;