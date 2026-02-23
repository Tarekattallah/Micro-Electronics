// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
    username:{ type: String, required: true, trim: true },   // trim: true removes whitespace from the beginning and end of the string
    email:{ type: String, required: true },
    password:{ type: String, required: true, unique: true, minlength: 6 },   // hashing passwords is recommended for security, but not implemented here for simplicity
    createdAt: { type: Date, default: Date.now },   // default value is the current date and time
    role: { type: String, enum: ['user', 'admin'], default: 'user' }   // role can be either 'user' or 'admin', default is 'user'
},{ timestamps: true }); 

// Create a model from the schema and export it
module.exports = mongoose.model('User', userSchema);