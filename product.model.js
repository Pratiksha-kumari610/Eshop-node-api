const mongoose = require('mongoose');
const CategorySchema = require('./category.model').schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name must be unique'],
        maxlength: [100, 'Product name must be less than 100 characters']
    },
    description: {
        type: String,        
        maxlength: [500, 'Product description must be less than 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be a positive number']
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150',
        required: true
    },
    category: {
        type: CategorySchema,
        required: [true, 'Product category is required']
    }
})

module.exports = mongoose.model('Product', productSchema);