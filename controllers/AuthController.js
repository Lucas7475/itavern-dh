const { Usuario } = require('../models');
const bcrpyt = require('bcrypt');

const AuthController = {
    
    login: async (req,res) => {

        let {email, senha} = req.body;

        usuario = await Usuario.findOne({where:{email}});
        // console.log(usuario);

        if(!usuario){
            return res.status(401).json({message:"Usuário e senha não correspondem."})
        }

        if(!bcrpyt.compareSync(senha, usuario.senha)){
            return res.status(401).json({message:"Usuário e senha não correspondem."})
        }
        
        req.session.idUsuario = usuario.id
        req.session.usuario = usuario
        return res.status(200).json({});

    }
}


module.exports = AuthController