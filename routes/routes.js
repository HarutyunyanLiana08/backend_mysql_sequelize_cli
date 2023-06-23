const express = require('express');
const category_controller = require('../controllers/category_controller')
const jwt_authenticate = require ("../middleware/jwt_authenticate")

const router = express.Router();
const usersController = require('../controllers/user_controller');

const productController = require('../controllers/product_controller');
 const upload = require('../middleware/multer')

    router.get('/allcategories',category_controller.getCategory)
    router.get('/category/:id',category_controller.getCategoryById)
    router.post('/createcategory',jwt_authenticate.authenticateAdminToken,category_controller.createCategory )
    router.delete('/deletecategory/:id',jwt_authenticate.authenticateAdminToken,category_controller.deleteCategory)
    router.put('/updatecategory/:id',jwt_authenticate.authenticateAdminToken,category_controller.updateCategory)
// Get all products
router.get('/allproducts', productController.getAllProducts);

// Get a single product by ID
router.get('/product/:id', productController.getProductById);
// Create a new product
router.post('/createproduct',jwt_authenticate.authenticateAdminToken, upload.single('image'),productController.createProduct);
// Update an existing product by ID
router.put('/updateproduct/:id',jwt_authenticate.authenticateAdminToken, upload.single('image'),productController.updateProduct);
// Delete an existing product by ID
router.delete('/deleteproduct/:id',jwt_authenticate.authenticateAdminToken,productController.deleteProduct);
router.post('/register', usersController.user_register);
router.post('/login', usersController.user_login);
router.get('/allusers',jwt_authenticate.authenticateAdminToken,usersController.get_users);
router.get('/singleuser/:id', jwt_authenticate.authenticateAdminToken,usersController.get_users_id);
router.delete('/deleteuser/:id',jwt_authenticate.authenticateAdminToken,usersController.delete_users);
module.exports = router;