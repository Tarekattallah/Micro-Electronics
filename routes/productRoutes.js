const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CRUD Routes
router.post('/', productController.createProduct);        // Create
router.get('/', productController.getProducts);           // Read All
router.get('/:id', productController.getProductById);     // Read One
router.put('/:id', productController.updateProduct);      // Update
router.delete('/:id', productController.deleteProduct);   // Delete

module.exports = router;