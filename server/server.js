require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuario',function(req,res){
    res.json('Get usuarios');
})

app.post('/usuario',function(req,res){

    var body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({
           ok:false
        });
    }
    else{
        res.json({
            body
        });
    }
})

app.put('/usuario/:id',function(req,res){

    let id = req.params.id;

    res.json({
        id
    });
})

app.delete('/usuario',function(req,res){
    res.json('Delete usuarios');
})

app.listen(process.env.PORT ,() => {
    console.log('Escuhando en puerto: ', 3000);
});