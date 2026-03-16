const Product = require('../models/product.model');

// Get All product
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        error: false,
        message: 'Products retrieved successfully',
        count: products.length,
        data: products
    })
}

// Get Single product
exports.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            error: true,
            message: 'Product not found'
        });
    }   
    res.status(200).json({
        error: false,
        message: 'Product retrieved successfully',
        data: product
    })
}

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    const products = await Product.find({ 'category.name': req.params.category });
    res.status(200).json({
        error: false,
        message: 'Products retrieved successfully',
        count: products.length,
        data: products
    })
}

// Create product
exports.createProduct = async (req, res) => {
    const { name, description, price, image, category } = req.body;
    const product = new Product({
        name,
        description,
        price,
        image,
        category
    });
    await product.save();
    res.status(201).json({
        error: false,
        message: 'Product created successfully',
        data: product
    });
}