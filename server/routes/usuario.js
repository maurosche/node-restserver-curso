const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario',function(req,res){

    //res.json('Get usuarios');

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let hasta = req.query.hasta || 5;
    hasta = Number(hasta);

    Usuario.find({estado:true} , 'id nombre estado rol ')
            .skip(desde)
                .limit(hasta)
                    .exec(
                            (err, usuarios) => {

                                if (err) {
                                    return res.status(400).json({
                                        ok:false,
                                        err
                                    });
                                }

                                Usuario.count({estado:true})
                                            .exec((err,count)=>{
                                                res.json({
                                                    ok:true,
                                                    usuarios,
                                                    count
                                                });
                                            })
                                
                         
                            }
    );
})

app.post('/usuario',function(req,res){

    var body = req.body;

    let usuario = new Usuario({
        nombre : body.nombre,
        email : body.email,
        password : bcrypt.hashSync(body.password,10),
        role : body.role
    });

    usuario.save( (err, usuarioDB)=> {

        if(err)
        {
            return res.status(400).json({
                ok:false,
                err
             });
        }

        res.json({
            ok: true,
            usuario : usuarioDB
        });
    });

    // if(body.nombre === undefined){
    //     res.status(400).json({
    //        ok:false
    //     });
    // }
    // else{
    //     res.json({
    //         body
    //     });
    // }
})

app.put('/usuario/:id',function(req,res){
debugger;
    let id = req.params.id;
    let body =  _.pick(req.body, ['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate(id,body, {new:true,runValidators:true},(err,usuarioDB) =>{

        if(err)
        {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            usuario : usuarioDB
        });
    });   
})

app.delete('/usuario/:id',function(req,res){

    //res.json('Delete usuarios');

    let id = req.params.id;

    //Usuario.findByIdAndRemove(id, (err,usuarioBorrado) =>{

    Usuario.findByIdAndUpdate(id, {estado:false}, (err,usuarioBorrado) =>{

        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if (!usuarioBorrado) {

            return res.json({
                ok:false,
                err : "No se encuentra usuario"
            });
        }
        
        res.json({
            ok:true,
            usuario : usuarioBorrado
        });
       
    });

})

module.exports = app;