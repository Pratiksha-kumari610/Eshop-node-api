const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: [true, 'first name is required'],
        trim: true,
    },
    lastName:{
        type: String,       
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be unique'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'email is invalid']
    },
    mobile:{
        type: String,
        required: [true, 'mobile number is required'],
        unique: [true, 'mobile number must be unique'],
        trim: true,
        match: [/^\d{10}$/, 'mobile number must be 10 digits']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must be at least 6 characters'],
        select: false
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
},{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);
