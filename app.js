require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running successfully');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
// Connect Database 
connectDB()



// // Connect Database and Start Server
// connectDB()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error('Failed to start server:', err);
//     });



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});