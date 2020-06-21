// const gruposDB = require("../database/grupos.json");

const { Jogo, Usuario, Grupo } = require('../models');

//
function gruposDoUsuario(id){
   return Usuario.findByPk(id,{include:[
    {
        model:Grupo,
        as:"gruposDoUsuario"
    }
]}).then(data => {
    return data.toJSON().gruposDoUsuario;
        }
)
}
function listaJogos(){
  return Jogo.findAll().then(
    data => {
        return data.map(u => u.toJSON())
    });
}
module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  home: async (req, res) => {
    let jogos = await listaJogos();
    let id = req.session.idUsuario;
    let gruposDB = await gruposDoUsuario(id);
    res.render("home", {
      gruposDB,
      jogos
    });
  },
  perfil: async (req, res) => {
    let jogos = await listaJogos();
    let { usuario } = req.session;
    res.render("editar-perfil", {jogos, usuario});
  },
  chat: async (req,res) =>{
    let gruposDB = gruposDoUsuario(1) 
    // console.log(req.query)
    res.render("grupos",{
      gruposDB,
    })
  },
  info: (req, res) => {
    
  }
};