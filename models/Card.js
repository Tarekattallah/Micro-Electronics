// Require Mongoose
const mongoose = require('mongoose');
// Define a schema

const productItem = new mongoose.Schema({
    productId : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity : { type: Number, required: true, min: 1 }
} , { timestamps: true });

const CardSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items : [productItem]
} , { timestamps: true });


module.exports = mongoose.model('Card', CardSchema); 
