var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin/adminRouter");
var authRouter = require("./routes/auth/authRouter.js");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    secret: "this is hospital key",
    //强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
    resave: false,
    //强制将未初始化的 session 存储。  默认值是true  建议设置成true
    saveUninitialized: true,
    cookie: {
      maxAge: 5000 /*过期时间*/,
    },
    //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期
    rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
//后台管理
app.use("/admin", adminRouter);
//登陆注册
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
