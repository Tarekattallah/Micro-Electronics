//Require dotenv 
require('dotenv').config();

//Require express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// reuire bycrypt for password hashing (not implemented here for simplicity)
const bcrypt = require('bcrypt');

// Middleware
app.use(express.json());

// Route test
app.get('/', (req, res) => {
    res.send('Server is running successfully');
});

//Require mongoose
const mongoose = require('mongoose');
//Connect to MongoDB
async function connectDB() {    
    try {
        await mongoose.connect(process.env.DB_URL,
        );
        console.log('Connected');
    } catch (error) {
        console.error(error);
    }    
}
connectDB();

//...require user model
const User = require('./models/User');
const Product = require('./models/product');



// register route
app.post('/register', async (req, res) => {
    try {
        // get user data from request body
        const { username, email, password, createdAt, role } = req.body;

        // validation can be added here to check for required fields and valid email format
        // check if username, email, and password are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }
        // check if email already exists in the database
        const existerUser = await User.findOne({ email });
        if (existerUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        
        // hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10); // hash the password with a salt round of 10 between 10 and 12 is recommended for security
        
        // create a new user instance and save to the database
        const user = await User.create({ username, email, password: hashedPassword, createdAt, role });
        res.status(201).json({ message: 'User registered successfully', user }); 
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation can be added here to check for required fields and valid email format
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // check if user with the provided email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // compare the provided password with the hashed password in the database
        const matchPassword = await bcrypt.compare(password, user.password);  // compare the provided password with the hashed password in the database
        if (!matchPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // if login is successful, send a success response
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
});


// Admin – Update Product
app.put('/api/products/:id', async (req, res) => {
    try {
        const { name, price, stockQuantity } = req.body;
        if (!name || !price || !stockQuantity) return res.status(400).json({ message: 'All fields are required' });
         // check user role is admin
        if (req.userId && req.userId.role !== 'admin') {
            return res.status(400).json({ message: 'You do not have permission' });
        }
        const updatedProduct = await product.findByIdAndUpdate(
            req.params.id,
            { name, price, stockQuantity },
            { new: true }
        );
        
    } catch (error) {
        console.error('Error updating:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//User – View All Products

app.get('/api/products', async (req, res) => {
    try {
        const products = await product.find();  
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'Server error' });
    }   
});

//User – View Product by ID
app.get('/api/products/:id', async (req, res) => {
try {
    const products = await product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('User not found');
    }
    res.json(products) ;

} catch (error) {
    console.error('Error :', error);
    res.status(500).json({ message: 'Server error' });
    
}
});

//User – View Product by Name
app.get('/products/:name',async(req,res)=>{
    try {
        const product = await Product.find({name:req.params.name});
        if(!product){
            return res.status(404).json({msg:"Product not found"});
        }
        res.status(200).json({msg:"Product updated successfully",product});
    } catch (error) {
        console.log(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running  ${PORT}`);
});