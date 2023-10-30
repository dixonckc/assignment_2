const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/product.routes'); // Import the product routes

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors());

// MongoDB connection using Mongoose
mongoose.connect('mongodb+srv://dixoncck:d33ld77d@cluster0.o3ndgpl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Use the product routes for CRUD operations
app.use(productRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to DressStore application." });
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
