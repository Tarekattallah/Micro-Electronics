require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

//  Connect Database 
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => {
        console.error('Database connection error:', err.message);
        process.exit(1);
    });

// Routes
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running successfully');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});