const Category = require('../models/category.model');

// Get all categories
exports.getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        error: false,
        message: 'Categories retrieved successfully',
        data: categories
    });
}

// Get category by ID
exports.getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({
            error: true,
            message: 'Category not found'
        });
    }
    res.status(200).json({
        error: false,
        message: 'Category retrieved successfully',
        data: category
    });
}

// Create new category
exports.createCategory = async (req, res) => {
    const { name, description, image } = req.body;
    const category = new Category({ name, description, image });
    await category.save();
    res.status(201).json({
        error: false,
        message: 'Category created successfully',
        data: category
    });
}