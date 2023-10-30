const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
