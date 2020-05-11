const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const saltosDoHash = 10;

module.exports = {

    //cria um registro no DB com novo usuário
    storage: async (req,res) => {

            //recuperando dados do forms através do objeto body
            let {nome, nickname, email, senha} = req.body;

            //hashing na senha
            senha = bcrypt.hashSync(senha, saltosDoHash);


            //buscando por email já existente
            if(await Usuario.findOne({where:{email}})) {
                return res.send({message:"Este email já está cadastrado."})
            }

            //criando usuario
            await Usuario.create({nome,nickname,email,senha});
            return res.redirect("/");
    }
}