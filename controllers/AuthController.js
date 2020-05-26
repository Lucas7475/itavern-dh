const { Usuario } = require('../models');
const bcrpyt = require('bcrypt');

const AuthController = {
    
    login: async (req,res) => {

        let {email, senha} = req.body;

        usuario = await Usuario.findOne({where:{email}});

        if(!usuario){
            return res.send({message:"Erro ao tentar realizar o login."})
        }

        if(!bcrpyt.compareSync(senha, usuario.senha)){
            return res.send({message:"Erro ao tentar realizar o login."})
        }
        
        //req.session.usuario = usuario;
        return res.redirect('home');

    }
}


module.exports = AuthController