// Require Mongoose

const mongoose = require('mongoose');

// Define a schema

const productSchema = new mongoose.Schema({
product_name:{type: String, required: true},
price:{type: Number, required: true, min:0},
stock: {type: Number, default: 0}
},{ timestamps: true }); 


//create a model

const Product = mongoose.model('Product', productSchema);

// Export the modelmodule.exports = Product;

module.exports = Product;


