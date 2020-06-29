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
function infoGrupo(id){
  return Grupo.findByPk(id,{include:
    [
      {
        model: Usuario,
        as: "usuariosDoGrupo"
      }
    ]
  }).then(data =>{
    return data.toJSON();
  })
}
function arrumaDataDb(dataUs){
  let dia = `0${dataUs.getDate()}`.length == 2? `0${dataUs.getDate()}`:`${dataUs.getDate()}`;
  let mes = `0${dataUs.getMonth() + 1}`.length == 2? `0${dataUs.getMonth() + 1}`:`${dataUs.getMonth() + 1}`;
  let ano = dataUs.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  home: async (req, res) => {
    let jogos = await listaJogos();
    let id = req.session.idUsuario;
    let nickname = req.session.usuario.nickname;
    let gruposDB = await gruposDoUsuario(id);

    res.render("home", {
      gruposDB,
      jogos,
      nickname
    });
  },
  perfil: async (req, res) => {
    let jogos = await listaJogos();
    let { usuario } = req.session;
    let nickname = req.session.usuario.nickname;
    res.render("editar-perfil", {jogos, usuario, nickname});
  },
  chat: async (req,res) =>{
    let gruposDB = gruposDoUsuario(1) 
    let nickname = req.session.usuario.nickname
    // console.log(req.query)
    res.render("grupos",{
      gruposDB,
      nickname
    })
  },
  sair: (req, res) =>{
    req.session.usuario = undefined;
    req.session.idUsuario = undefined;
    res.redirect("/");
  },
  info: async (req, res) =>{
    let id = req.params.id;
    let infGrupo = await infoGrupo(id);
    infGrupo.usuariosDoGrupo.forEach(usuario =>{
      usuario.senha = undefined,
      usuario.createdAt = undefined,
      usuario.updatedAt = undefined,
      usuario.usuarioGrupo = undefined
    })
    infGrupo.inicioReuniao = arrumaDataDb(infGrupo.inicioReuniao);
    res.status(200).json({infGrupo});
  }
};