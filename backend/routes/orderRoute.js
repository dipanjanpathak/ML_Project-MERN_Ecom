const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { addOrderItem,
    getOrderById,
    updateOrderToPaid,
    createRazorpayOrder,
    getMyOrders
} = require('../controllers/orderController');

const router = express.Router();


// get Userorders
router.route('/myorders').get(protect,getMyOrders)


// Create new order item
router.route('/item-order').post(protect, addOrderItem);

// Get order by ID
router.route('/:id').get(protect, getOrderById);

// Razorpay Route
router.route('/razorpay/order').post(protect, createRazorpayOrder);



// Update Order
router.route("/:id/pay").put(protect, updateOrderToPaid)




module.exports = router;
