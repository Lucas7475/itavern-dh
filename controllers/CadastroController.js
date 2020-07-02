const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const saltosDoHash = 10;

module.exports = {

    //cria um registro no DB com novo usuário
    storage: async (req,res) => {

            //recuperando dados do forms através do objeto body
            let {nome, nickname, email, senha} = req.body;

            
            if(!nome || !nickname || !email || !senha){
                res.send({message:"Preencha todo o formulário!"})
            }

            //hashing na senha
            senha = bcrypt.hashSync(senha, saltosDoHash);


            //buscando por email já existente
            if(await Usuario.findOne({where:{email}})) {
                return res.send({message:"Este email já está cadastrado."})
            }

            if(await Usuario.findOne({where:{nickname}})){
                return res.send({message:"Este nome de usuário já está cadastrado. Por favor, escolha outro!"})
            }

            //criando usuario
            await Usuario.create({nome,nickname,email,senha});

            //pegando o usuario criado
            let usuario = await Usuario.findOne({
                where:{
                    nickname:nickname
                },
                attributes:["id","nickname"]
            })

            req.session.idUsuario = usuario.id
            req.session.usuario = usuario

            return res.redirect("/home");
    }
}