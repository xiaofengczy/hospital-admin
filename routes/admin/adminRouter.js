var express = require('express');
var router = express.Router();

var userRouter = require('./userRouter')
var newsRouter = require('./newsRouter');
var doctorsRouter = require('./doctorsRouter');
var patientsRouter = require('./patientsRouter');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('后台首页');
});

router.use('/user',userRouter);//用户
router.use('/news',newsRouter);//新闻
router.use('/doctors',doctorsRouter);//医生
router.use('/patients',patientsRouter);//患者

module.exports = router;
