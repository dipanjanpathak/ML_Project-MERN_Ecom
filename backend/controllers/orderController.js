
// orderController.js
const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');
const Razorpay = require('razorpay');



const addOrderItem = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, offerPrice, shippingPrice, totalPrice } = req.body;


    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error('No Order Items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            offerPrice,
            shippingPrice,
            totalPrice
        });

        try {
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            console.error('Error saving order:', error);
            res.status(500).json({ message: error.message });
        }
    }
});




const getOrderById = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: error.message });
    }
});



//paid end point
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
            id: req.body.razorpayPaymentId,
            status: req.body.status,
            update_time: Date.now(),
                email_address : order.user.email,            
            }
        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error("Order Not Found")
    }
})


const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: error.message });
    }
});




const getMyOrders = asyncHandler(async (req, res) => {


  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = { addOrderItem, getOrderById, updateOrderToPaid,createRazorpayOrder, getMyOrders};

