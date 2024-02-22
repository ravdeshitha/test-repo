const express = require('express');
const router = express.Router();
const db = require('../../Connection');

router.get('/userList', (req, res) =>{
    db.query(
        "SELECT * FROM users",
        (err, result) =>{
            if(err){
                res.send(err);
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    )
});

module.exports = router;