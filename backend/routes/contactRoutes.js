import express from 'express';
import { sendContactForm, getContactStats } from '../controllers/contactController.js';

const router = express.Router();

// Contact form routes
router.post('/contact', sendContactForm);
router.get('/contact/stats', getContactStats);

export default router;
