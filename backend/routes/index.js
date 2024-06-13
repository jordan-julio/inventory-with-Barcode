var express = require('express');
var router = express.Router();
const controller = require("../controller/indexController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Hello World!' });
});

// get test route outputs JSON object random
router.get('/api/test', function(req, res, next) {
  res.json({ message: 'Hello World!' });
});


router.get("/api/getusers", controller.users.getAll);

router.post('/api/register', controller.users.register);

router.post('/api/login', controller.users.login);

module.exports = router;
