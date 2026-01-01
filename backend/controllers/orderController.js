import Order from '../models/Order.js';
import User from '../models/User.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;
    const userId = req.user.id;


    // Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      // Parse price - handle both string and number formats
      let price = item.price;
      if (typeof price === 'string') {
        // Remove ₹ and $ symbols and parse as float
        price = parseFloat(price.replace(/[₹$,]/g, ''));
      }
      return total + (price * item.quantity);
    }, 0);

    // Create order
    const order = new Order({
      user: userId,
      items: items.map(item => {
        // Parse price - handle both string and number formats
        let price = item.price;
        if (typeof price === 'string') {
          // Remove ₹ and $ symbols and parse as float
          price = parseFloat(price.replace(/[₹$,]/g, ''));
        }
        return {
          productId: item.id,
          name: item.name,
          category: item.category,
          price: price,
          quantity: item.quantity,
          image: item.image || ''
        };
      }),
      totalAmount,
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || 'cash_on_delivery',
      notes: notes || ''
    });

    await order.save();

    // Populate user details
    await order.populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    let query = { user: userId };
    if (status && status !== 'all') {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Get single order details
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, user: userId })
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, trackingNumber, notes } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update fields
    if (status) order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (notes) order.notes = notes;

    await order.save();

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: order
    });

  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      error: error.message
    });
  }
};

// Track order
export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, user: userId })
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Mock tracking information (in real app, this would integrate with shipping provider)
    const trackingInfo = {
      orderNumber: order.orderNumber,
      status: order.status,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      trackingHistory: [
        {
          status: 'Order Placed',
          timestamp: order.createdAt,
          location: 'BuildBazaarX Warehouse',
          description: 'Your order has been received and is being processed'
        },
        ...(order.status !== 'pending' ? [{
          status: 'Processing',
          timestamp: new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000),
          location: 'BuildBazaarX Warehouse',
          description: 'Your order is being prepared for shipment'
        }] : []),
        ...(order.status === 'shipped' || order.status === 'delivered' ? [{
          status: 'Shipped',
          timestamp: new Date(order.createdAt.getTime() + 2 * 24 * 60 * 60 * 1000),
          location: 'Shipping Center',
          description: 'Your order has been shipped'
        }] : []),
        ...(order.status === 'delivered' ? [{
          status: 'Delivered',
          timestamp: new Date(order.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000),
          location: 'Your Address',
          description: 'Your order has been delivered'
        }] : [])
      ]
    };

    res.json({
      success: true,
      data: trackingInfo
    });

  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track order',
      error: error.message
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Only allow cancellation if order is pending or processing
    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order that has already been shipped'
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order',
      error: error.message
    });
  }
};
