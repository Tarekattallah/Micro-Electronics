const Product = require('../models/product');
const Card = require('../models/Card');
const User = require('../models/User');

// Create Card
exports.addCard = async (req, res) => {
    try {
        //get data from body
        const { userId, ProductId, quantity } = req.body;
        //validate data
        if (!userId || !ProductId || !quantity)
            return res.status(400).json({ message: 'All fields are required' });
        //check  userid and productid exist in database
        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const product = await Product.findById(ProductId);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        if (quantity > product.stock)
            return res.status(400).json({ message: 'stock not enough' });
        //check if card exist for user
        let card = await Card.findOne({ userId });
        if (!card) {
            card = await Card.create({ userId, items: [] });
        }
        
    
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Card By User ID
exports.getCardByUserId = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

// Remove Product from Card
exports.removeProductFromCard = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};
