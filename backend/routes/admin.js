var express = require('express');
var router = express.Router();
const controller = require("../controller/indexController");

/* register new user from admin page. */
router.get('/api/getAllUsers', controller.admins.getAllUsers);
router.get('/api/getOneUser/:id', controller.admins.getOneUser);
router.post('/api/register', controller.admins.registerNewUsersWithoutToken);
router.put('/api/editOneUser', controller.admins.editOneUser);
router.delete('/api/deleteOneUser/:id', controller.admins.deleteOneUser);

// router for categories add delete and get
router.post('/api/addCategory', controller.admins.addOneCategory);
router.put('/api/editOneCategory', controller.admins.editOneCategory);
router.get('/api/getAllCategories', controller.admins.getAllCategories);
router.get('/api/getOneCategory/:id', controller.admins.getOneCategory);

// router for products add delete and get
router.post('/api/addProduct', controller.admins.addOneProduct);
router.get('/api/getAllProducts', controller.admins.getAllProducts);
// router.get('/api/getOneProduct/:id', controller.admins.getOne);

module.exports = router;
