const express = require('express');
const cors = require('cors');
const db = require('./Connection');

const app = express();

app.use(express.json());
app.use(cors());

const port = 33061;


//main routes paths
const usersRoute = require('./Routes/Users');//sign in, sign up, user editings

//admin route path
const adminBoard = require('./AdminRoutes/AdminBoard');

//asign routers
app.use('/api/user', usersRoute);//signUp, Signin 
app.use('/api/adminBoard',adminBoard);//Admin panel main branche



app.listen(port, () =>{
    console.log("server running...");
})
