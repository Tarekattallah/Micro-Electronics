const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post("/createProduct", createProduct);
router.get("/products", getProducts);
router.get("/products/:name", getProductByName);


module.exports = router;