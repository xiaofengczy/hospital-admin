var express = require("express");
var router = express.Router();
var sqlQuery = require("../../utils/mysqlUtil");
var crypto = require("crypto");

function encryption(str, salt) {
  let obj = crypto.createHash("md5");
  str = salt + str;
  obj.update(str);
  return obj.digest("hex");
}

function getRandomSalt() {
  return Math.random().toString(16).slice(2, 5);
}

/* 登陆页面 */
router.get("/login", function (req, res, next) {
  res.render("auth/login.ejs");
});

/* 注册 */
router.get("/register", function (req, res, next) {
  res.render("auth/register.ejs");
});

/* 登陆逻辑 */
router.post("/login", async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  //根据账号查询用户
  let sql = "select * from t_user where username = ?";
  let result = await sqlQuery(sql, [username]);
  if (result.length !== 0) {  
    if (result[0].password === encryption(password, result[0].salt)) {
      req.session.username = username;
      //登陆成功
      res.render("info/error.ejs", {
        title: "登陆成功",
        content: "恭喜您，登陆成功",
        hrefText: "主页",
        href: "/admin",
      });
    } else {
      //登陆失败
      res.render("info/error.ejs", {
        title: "登陆失败",
        content: "账号或密码错误",
        hrefText: "登陆页",
        href: "/auth/login",
      });
    }
  } else {
    //登陆失败
    res.render("info/error.ejs", {
      title: "登陆失败",
      content: "账号或密码错误",
      hrefText: "登陆页",
      href: "/auth/login",
    });
  }
});

/* 注册逻辑 */
router.post("/register", async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let sql = "select * from t_user where username = ?";
  let result = await sqlQuery(sql, [username]);
  if (result.length !== 0) {
    //已经注册
    res.render("info/error.ejs", {
      title: "注册失败",
      content: "用户已存在",
      hrefText: "注册页",
      href: "/auth/register",
    });
  } else {
    sql = "insert into t_user (username,password,salt) values (?,?,?)";
    let salt = getRandomSalt();
    result = await sqlQuery(sql, [username, encryption(password, salt), salt]);
    res.render("info/error.ejs", {
      title: "注册成功",
      content: "恭喜您,注册成功",
      hrefText: "登陆页",
      href: "/auth/login",
    });
  }
});

module.exports = router;