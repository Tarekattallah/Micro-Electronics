const Product = require('../models/product');



// Get All
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get By ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(404).json({ message: 'Product not found' });

        res.json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, stockQuantity } = req.body;

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, stockQuantity },
            { new: true }
        );

        if (!updated)
            return res.status(404).json({ message: 'Product not found' });

        res.json(updated);

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