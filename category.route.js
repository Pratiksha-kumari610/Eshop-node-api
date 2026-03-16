const express = require('express');
const router = express.Router();

const {
    getAllCategories,
    getCategoryById,
    createCategory
} = require('../controllers/category.controller');

router
    .route('/')
    .get(getAllCategories)
    .post(createCategory);

router
    .route('/:id')
    .get(getCategoryById);

module.exports = router;