const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,        
    },
    image:{
        type: String,
        default: 'https://via.placeholder.com/150',
        required: true
    }
})

module.exports = mongoose.model('Category', categorySchema);