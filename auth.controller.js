const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {generateToken} = require('../../utils/jwt');

exports.register = async (req, res) => {
    const {firstName, email,mobile, password} = req.body;

    // check if the user already exists
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            error: true,
            message: 'User already exists'
        })
    }

    // hash the password
    const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user
    const user = await User.create({
        firstName,
        email,
        mobile,
        password: hashedPassword
    })

    // generate token
    const token = generateToken(user._id);

    res.status(201).json({
        error: false,
        message: 'User registered successfully',
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        }
    })
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    // find user and include password
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(400).json({
            error: true,
            message: 'Invalid email address'
        })
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            error: true,
            message: 'Invalid password'
        })
    }

    // generate token
    const token = generateToken(user._id);

    res.status(200).json({
        error: false,
        message: 'User logged in successfully',
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        }
    })
}