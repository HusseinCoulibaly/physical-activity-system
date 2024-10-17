// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser); // Modifier un utilisateur
router.delete('/:id', deleteUser); // Supprimer un utilisateur
router.get('/', getAllUsers); // Obtenir tous les utilisateurs

module.exports = router;
