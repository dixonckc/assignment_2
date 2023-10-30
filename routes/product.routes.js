const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single product by ID
router.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new product
router.post('/api/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a product by ID
router.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        Object.assign(product, req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove a product by ID
router.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove all products
router.delete('/api/products', async (req, res) => {
    try {
        await Product.deleteMany();
        res.json({ message: 'All products deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Find all products which name contains 'kw'
router.get('/api/products?name=[kw]', async (req, res) => {
    try {
        const products = await Product.find({ name: new RegExp(req.query.name, 'i') });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
