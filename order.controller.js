const Order = require('../models/order.model');
const Product = require('../models/product.model')

exports.submitOrder = async (req, res) => {

    const { items, shippingAddress } = req.body

    if (!req.user) {
        return res.status(401).json({
            error: true,
            message: 'Authentication required'
        })
    }

    // Validate products and calculate total price
    let totalPrice = 0
    const orderItems = []

    for (const item of items) {

        const product = await Product.findById(item.product)

        if (!product) {
            return res.status(400).json({
                error: true,
                message: `Product with ID ${item.product} not found`
            })
        }

        if (product.stock < item.quantity) {
            return res.status(400).json({
                error: true,
                message: `Insufficient stock for product ${product.name}`
            })
        }

        const itemTotal = product.price * item.quantity
        totalPrice += itemTotal

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price
        })

        // Update product stock
        product.stock -= item.quantity
        await product.save()
    }

    // Create order
    const order = await Order.create({
        user: req.user._id,
        items: orderItems,
        shippingAddress,
        totalAmount: totalPrice
    })

    res.status(201).json({
        error: false,
        message: 'Order submitted successfully',
        orderId: order._id
    })
}

exports.getOrderDetails = async (req, res) => {
    const orderId = req.params.id;

    if(!req.user) {
        return res.status(401).json({
            error: true,
            message: 'Authentication required'
        })
    }

    const order = await Order.findById(orderId)
        .populate('items.product', 'name price image')
        .populate('user', 'name email')

    if (!order) {
        return res.status(404).json({
            error: true,
            message: 'Order not found'
        })
    }

    // check if user owns the order or is an admin
    if(order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(403).json({
            error: true,
            message: 'Access denied'
        })
    }

    res.status(200).json({
        error: false,
        data: order
    })
}

exports.getUserOrders = async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: true,
            message: 'Authentication required'
        })
    }

    const query = {user:req.user._id}

    // admin can see all orders
    if(req.user.role === 'admin' && req.query.userId) {
        query.user = req.query.userId
    }

    const orders = await Order.find(query)
        .populate('items.product', 'name price image')
        .populate('user', 'name email')
        .sort({ createdAt: -1 })

    res.status(200).json({
        error: false,
        data: orders
    })
}

module.exports = {
    submitOrder,
    getOrderDetails,
    getUserOrders
}