// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser); ;

module.exports = router;
