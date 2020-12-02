var express = require('express');
var router = express.Router();
let auth = require('../helper/Bearer-passport')();

var User_Ctrl = require('../controllers/UserController');

router.post('/register',  User_Ctrl.register);
router.get('/', User_Ctrl.list);
router.post('/login',  User_Ctrl.checkLogon);
router.get('/email/:email', auth.authenticate(), User_Ctrl.findByEmail);
router.get('/:userId', auth.authenticate(),  User_Ctrl.get);
router.put('/:userId', auth.authenticate(), User_Ctrl.put);
router.delete('/:userId',  auth.authenticate(), User_Ctrl.delete);

module.exports = router;
