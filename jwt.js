const jwt = require('jsonwebtoken');

const generateToken = (userId) =>{
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    return jwt.sign({userId}, secret,  {
        expiresIn
    })
    };

 const verifyToken = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET || 'falback_secret');
 }   

 module.exports ={
    generateToken,
    verifyToken
 }