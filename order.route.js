const express = require('express');
const router = express.Router();
const {
        submitOrder,
        getOrderDetails,
        getUserOrders
} = require('../controllers/order.controller');
const { authenticate } = require('../../middleware/auth');

router
    .route('/')
    .post(authenticate, submitOrder);

router
    .route('/:id')
    .get(authenticate, getOrderDetails);

router
    .route('/user')
    .get(authenticate, getUserOrders);


module.exports = router;