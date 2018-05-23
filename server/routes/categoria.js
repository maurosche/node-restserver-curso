const express = require('express');

const {verificarToken,verificarAdmin_Role} = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//==========================
// Trae todos las categorías
//==========================
app.get('/categoria', verificarToken, (req,res)=>{

    Categoria.find({})
        .sort('descripcion')
        .populate('Usuario','nombre email')
        .exec((err,categorias)=>{

        if (err) {

            return res.status(400).json({
                ok : false,
                err
            });            
        }

        res.json({
            ok:true,
            categorias 
        });

    });

});

//==========================
// Trae categoría por ID
//==========================
app.get('/categoria/:id', verificarToken, (req,res)=>{

    let id = req.params.id;

    Categoria.findById(id).exec((err,categoria)=>{

        if (err) {

            return res.status(400).json({
                ok : false,
                err
            });            
        }

        if (!categoria) {

            return res.status(400).json({
                ok : false,
                err,
                message: "La categoría no existe."
            });            
        }

        res.json({
            ok:true,
            categoria 
        });

    });
});

//==========================
// Modifica categoría
//==========================
app.put('/categoria/:id', verificarToken, (req,res)=>{

    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body,{new:true,runValidators:true}, (err,categoria)=>{

        if (err) {

            return res.status(400).json({
                ok : false,
                err
            });            
        }

        if (!categoria) {

            return res.status(400).json({
                ok : false,
                err,
                message: "La categoría no existe."
            });            
        }

        res.json({
            ok:true,
            categoria ,
            message : "Modificado con éxito." 
        });

    });
});

//==========================
// Agrega categoría
//==========================
app.post('/categoria', verificarToken, (req,res)=>{

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario : req.usuario._id
    });

    categoria.save( (err,categoria)=>{

        if (err) {

            return res.status(500).json({
                ok : false,
                err
            });            
        }

        if (!categoria) {

            return res.status(400).json({
                ok : false,
                err
            });            
        }

        res.json({
            ok:true,
            categoria ,
            message : "Agregado con éxito." 
        });

    });

});

//==========================
// Elimina categoría
//==========================
app.delete('/categoria/:id', [verificarToken,verificarAdmin_Role], (req,res)=>{

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err,categoria)=>{

        if (err) {

            return res.status(400).json({
                ok : false,
                err
            });            
        }

        if (!categoria) {

            return res.status(400).json({
                ok : false,
                err,
                message: "La categoría no existe."
            });            
        }

        res.json({
            ok:true,
            message : "Eliminado con éxito." 
        });

    });

});

module.exports = app;