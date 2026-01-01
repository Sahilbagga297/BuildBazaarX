import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  trackOrder,
  cancelOrder
} from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Create a new order (POST /api/orders)
router.post('/', createOrder);

// Get user's orders (GET /api/orders)
router.get('/', getUserOrders);

// Get single order details (GET /api/orders/:orderId)
router.get('/:orderId', getOrderById);

// Track order (GET /api/orders/:orderId/track)
router.get('/:orderId/track', trackOrder);

// Cancel order (PUT /api/orders/:orderId/cancel)
router.put('/:orderId/cancel', cancelOrder);

// Update order status (PUT /api/orders/:orderId/status) - Admin only
router.put('/:orderId/status', updateOrderStatus);

export default router;
