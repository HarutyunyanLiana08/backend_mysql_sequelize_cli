const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category_controller')
const jwt_authenticate = require ("../middleware/jwt_authenticate")
const cors = require("cors")
router.use(cors())

    router.get('/allcategories',category_controller.getCategory)
    router.get('/category/:id',category_controller.getCategoryById)
    router.post('/createcategory',
    jwt_authenticate.authenticateAdminToken,category_controller.createCategory )
    router.delete('/deletecategory/:id',jwt_authenticate.authenticateAdminToken,category_controller.deleteCategory)
    router.put('/updatecategory/:id',jwt_authenticate.authenticateAdminToken,category_controller.updateCategory)

module.exports = router;