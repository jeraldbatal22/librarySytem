const e = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud_app'
});

connection.connect((error) => {
    if(!!error) console.log(error);
    else console.log ('Data Base Connected')
});



module.exports.GetQuery = (sql, data = []) => {
    return new Promise((resolve) => {
        connection.query(sql,data,(error, result) => {
            if(error) {
                console.log(error)
                resolve(false)
            } else {
                resolve(result)
            }
        })
    })
}