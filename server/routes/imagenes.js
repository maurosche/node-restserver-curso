const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const {verificarTokenImg} = require('../middlewares/autenticacion');


app.get('/imagen/:tipo/:img', verificarTokenImg, (req,res)=>{

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname,`../../uploads/${tipo}/${img}`);
    let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg');

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else{
        res.sendFile(noImagePath);
    }
});

module.exports = app;