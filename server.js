// import modules
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const dbConnect = require('./config/db');
const cors = require('cors');

// load env vars
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// connect to database
dbConnect();

// initialize express app
const app = express();

// add middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// import routes
const categoryRoutes = require('./api/routes/category.route');
const productRoutes = require('./api/routes/product.route');
const authRoutes = require('./api/routes/auth.route');

// use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});