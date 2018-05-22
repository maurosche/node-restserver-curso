const jwt = require('jsonwebtoken');

// =====================
//  Verificar token
// =====================
let verificarToken = (req , res , next) =>{

    let token = req.get('token');

    jwt.verify(token , process.env.SEED, (err, decoded)=>{

        if (err) {
            return res.status(401).json({
                ok: false,
                err : {
                    message : 'token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

// =====================
//  Verificar role_admin
// =====================
let verificarAdmin_Role = (req , res , next) =>{

    let token = req.get('token');

    jwt.verify(token , process.env.SEED, (err, decoded)=>{

        req.usuario = decoded.usuario;

        if (req.usuario.role == 'ADMIN_ROLE') {
            next();
        }
        else{
            return res.status(401).json({
                ok: false,
                err : {
                    message : 'Este usuario no tiene permisos.'
                }
            });
        }    
    });


};

module.exports = {
    verificarToken,
    verificarAdmin_Role
};