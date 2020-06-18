let mysql = require("mysql");
let options = {
  host: "148.70.30.245",
  prop: "3306",
  user: "root",
  password: "qq_123456_admin",
  database: "hospital",
};
let con = mysql.createConnection(options);
con.connect((err) => {
  if (err) throw err;
  console.log("连接成功");
});

function sqlQuery(sql, arr) {
  return new Promise(function (resolve, reject) {
    con.query(sql, arr, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = sqlQuery;
