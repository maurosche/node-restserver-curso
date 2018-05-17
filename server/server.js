require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario'));

mongoose.connect(process.env.urlDB, (err,res)=>{
     if (err) throw err;

     console.log("CONEXION OK!!");
});

app.listen(process.env.PORT ,() => {
    console.log('Escuhando en puerto: ', process.env.PORT);
});