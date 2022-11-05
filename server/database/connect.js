let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "db"
})

connection.connect(function (err) {
    if(err) {
        return console.log("Error")
    }
    console.log("Connected to db")
});

module.exports=connection;




