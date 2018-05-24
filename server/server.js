require('./config/config');

const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

app.use( require('./routes/index'));

mongoose.connect(process.env.urlDB, (err,res)=>{
     if (err) throw err;

     console.log("CONEXION OK!!");
});

app.listen(process.env.PORT ,() => {
    console.log('Escuhando en puerto: ', process.env.PORT);
});