const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');//moment lybrary for get the current time(sri lanka)

//database
const db = require('../Connection');

//user regidtration api
router.post("/register", (req,res) =>{
    const fullName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword; 

    const time = moment().tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss');// Format: YYYY-MM-DD HH:mm:ss

    let userType  = "user";

    if(req.body.userType && email){
        //if userType is admin then he/she has emailAddress
        userType = req.body.userType;

    }

    if(password === confirmPassword){
        bcrypt.hash(password, 10, (err, hashPassword) => {
            if(err){
                res.send({"bcrypt error});//password bcrypt has an error
            }
            else{
                db.query(
                    "INSERT INTO users(fullName, phoneNumber, password, userType, dateTime) VALUES(?, ?, ?, ?, ?)",
                    [fullName, phoneNumber, hashPassword, userType,time],
                    (err, result)=>{
                        res.send("sucess");
                    }
                );
            }
        });
    }
    else{
        res.send({message: "Password is incorect"});
    }
});

//User Login api

router.post("/login", (req, res) =>{
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE phoneNumber=?",
        phoneNumber,
        (err, result) =>{
            if(err){
                res.send({error: err});//query error
            }
            else if(result.length >0){
                bcrypt.compare(password, result[0].password, (err1, response) =>{
                    if(response){
                        res.send({message: "success", userType: result[0].userType}); //should use session for this usetr type
                        
                    }
                    else{
                       res.send({message: "password incorrect"});
                       
                    }
                });
            }
            else{
                res.send({message: "User doesn't exist"});
            }
        }
    );
});


//userType update api

router.post('/update/:id', (req, res) => {
    const userType = req.body.userType;
    const userId = req.params.id;

    db.query(
        "UPDATE users SET userType = ? WHERE userId = ?",
        [userType, userId],
        (err, result) =>{
            if(err){
                res.send({error: err});
            }
            else{
                res.send({message: "success"});
            }
        }
    );
});


module.exports = router;
