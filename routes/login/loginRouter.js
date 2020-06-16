var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login/login.ejs');
});


/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.render('/admin');
});



module.exports = router;
