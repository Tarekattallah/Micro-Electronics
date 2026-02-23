const Product = require('../models/product'); 

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { name, stock, price, createdBy } = req.body;
        if (!name || stock == null || price == null || !createdBy)
            return res.status(400).json({ message: 'All fields are required' });

        const product = await Product.create({ name, stock, price, createdBy });
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Product By ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, stock },
            { new: true, runValidators: true }
        );

        if (!updated)
            return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product updated successfully', product: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};