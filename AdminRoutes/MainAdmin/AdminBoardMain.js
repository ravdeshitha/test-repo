const express = require('express');
const router = express.Router();


//admin route path
const UserList = require('./UserListRoute');

//asign routers
router.use(UserList);


module.exports = router;