const router = require('express').Router();
const { registerController, loginController } = require('../controller/auth');

router.route('/register').post(registerController);
router.route('/login').post(loginController);

module.exports = router;