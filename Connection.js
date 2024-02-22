const mysql = require('mysql');

//connect to the MYSQL database
const db = mysql.createConnection({
    host: "sql310.infinityfree.com",
    user: "if0_36026768",
    password: "Wasanabakers1",
    database: "if0_36026768_wasana_company"
});

db.connect((err) =>{
    if(err){
        console.log("database connection error" ,err);
    }
    else{
        console.log("database connection sucessfully ");
    }
});


module.exports = db;
