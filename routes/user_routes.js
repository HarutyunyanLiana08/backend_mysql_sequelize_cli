const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user_controller');
const cors = require("cors")
router.use(cors())
const jwt_authenticate = require ("../middleware/jwt_authenticate")

router.post('/register', usersController.user_register);
router.post('/login', usersController.user_login);
router.get('/allusers',jwt_authenticate.authenticateAdminToken,usersController.get_users);
router.get('/singleuser/:id', jwt_authenticate.authenticateAdminToken,usersController.get_users_id);
router.delete('/deleteuser/:id',jwt_authenticate.authenticateAdminToken,usersController.delete_users);
module.exports = router;