import express from 'express';
import { register , login, logout , viewusers, getProfile, updateProfile } from '../controllers/authController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/viewusers' , viewusers);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;