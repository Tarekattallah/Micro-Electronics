// Require Mongoose

const mongoose = require('mongoose');

// Define a schema

const ProductSchema = new mongoose.Schema({
    name : { type: String, required: true, trim: true },
    price :{type : Number , required :true  , min : 0 } ,
    stockQuantity : { type: Number, required: true, min: 0 } ,
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
} , { timestamps: true });


//create a model
// Export the modelmodule.exports = Product;

module.exports = mongoose.model('Product', ProductSchema);




