const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');
 const jwt_authenticate = require ("../middleware/jwt_authenticate")
 const cors = require("cors")
 router.use(cors())

 // Get all products
router.get('/allproducts', productController.getAllProducts);

// Get a single product by ID
router.get('/product:id', productController.getProductById);

// Create a new product
router.post('/createproduct',jwt_authenticate.authenticateAdminToken,productController.createProduct);

// Update an existing product by ID
router.put('/updateproduct/:id',jwt_authenticate.authenticateAdminToken, productController.updateProduct);

// Delete an existing product by ID
router.delete('/deleteproduct/:id',jwt_authenticate.authenticateAdminToken,productController.deleteProduct);

module.exports = router;