var express = require('express');
var router = express.Router();
var sqlQuery = require('../../utils/mysqlUtil');


/* 登陆页面 */
router.get('/login', function(req, res, next) {
  res.render('auth/login.ejs');
});


/* 注册 */
router.get('/register', function(req, res, next) {
  res.render('auth/register.ejs');
});


/* 登陆逻辑 */
router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let sql = 'select * from user where username=? and password=?';
});

/* 注册逻辑 */
router.post('/register',async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let sql = 'select * from t_user where username = ?';
  let result = await sqlQuery(sql,[username]);
  if(result.length!==0){
    //已经注册
    res.render('info/error.ejs',{
      title:'注册失败',
      content:'用户已存在',
      hrefText:'注册页',
      href:'/auth/register'
    })
  }else{
    sql = 'insert into t_user (username,password) values (?,?)';
    result = await sqlQuery(sql,[username,password]);
    res.render('info/error.ejs',{
      title:'注册成功',
      content:'恭喜您,注册成功',
      hrefText:'登陆页',
      href:'/auth/login'
    })
  }
});


module.exports = router;
