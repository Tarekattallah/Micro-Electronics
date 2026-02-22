const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);

module.exports = router;