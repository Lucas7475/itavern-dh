// const gruposDB = require("../database/grupos.json");

const { Jogo, Usuario, Grupo, UsuarioGrupo } = require('../models');

//
function gruposDoUsuario(id){
  return UsuarioGrupo.findAll({
    where:{
      id_usuario:id,
      status:'aprovado'
    },
    include:[
      {
        model:Grupo,
        as:"dadosDosGrupo"
      }
    ]
  }).then(data => {
    return data.map(u => u.toJSON().dadosDosGrupo);
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
  return UsuarioGrupo.findAll(
    {
      where:{
        id_grupo:id,
        status:"aprovado"
      },
      include:
        [
          {
            model: Usuario,
            as: "dadosDosUsuario",
            attributes:["id", "nickname", "img_perfil"]
          },
          {
            model:Grupo,
            as:"dadosDosGrupo",
            attributes:["id","id_admin","nome", "inicioReuniao", "cep","id_jogo", "descricao"]
          }
        ]
    }).then(data =>{
    return data.map(u =>{
      return{
        dadosDosUsuario:u.toJSON().dadosDosUsuario,
        dadosDosGrupo:u.toJSON().dadosDosGrupo,
      }
    });
  })
}
function arrumaDataDb(dataUs){
  let dia = `0${dataUs.getDate()}`.length == 2? `0${dataUs.getDate()}`:`${dataUs.getDate()}`;
  let mes = `0${dataUs.getMonth() + 1}`.length == 2? `0${dataUs.getMonth() + 1}`:`${dataUs.getMonth() + 1}`;
  let ano = dataUs.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
// dados notificacao
function verificaPedidos (id){
  return UsuarioGrupo.findAll({
    where:{
      id_grupo: id,
      status: 'aguardando'
    },
    include:[
      {
        model:Usuario,
        as: 'dadosDosUsuario'
      }
    ]
  }).then(resul =>{
    return resul.map(u => u.toJSON());
  })
}

module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  home: async (req, res) => {
    let jogos = await listaJogos();
    let id = req.session.idUsuario;
    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;
    let gruposDB = await gruposDoUsuario(id);

    res.render("home", {
      gruposDB,
      jogos,
      nickname,
      imgPerfil
    });
  },
  perfil: async (req, res) => {
    let jogos = await listaJogos();
    let { usuario } = req.session;
    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;
    res.render("editar-perfil", {jogos, usuario, nickname, imgPerfil});
  },
  chat: async (req,res) =>{
    let gruposDB = gruposDoUsuario(1) 
    let nickname = req.session.usuario.nickname;
    let imgPerfil = req.session.usuario.img_perfil;
    // console.log(req.query)
    res.render("grupos",{
      gruposDB,
      nickname,
      imgPerfil
    })
  },
  sair: (req, res) =>{
    req.session.usuario = undefined;
    req.session.idUsuario = undefined;
    res.redirect("/sair");
  },
  info: async (req, res) =>{
    let id = req.params.id;
    let infGrupo = await infoGrupo(id);
    let usuariosDoGrupo = infGrupo.map(obj => obj.dadosDosUsuario);
    infGrupo = infGrupo[0].dadosDosGrupo;
    infGrupo.usuariosDoGrupo = usuariosDoGrupo;
    infGrupo.idLogado = req.session.idUsuario;
    infGrupo.inicioReuniao = arrumaDataDb(infGrupo.inicioReuniao);
    res.status(200).json({infGrupo});
  },
  pedidos: async (req, res) =>{
    let id = req.params.id;
    let pedidos = await verificaPedidos(id);

    pedidos = pedidos.map(pedido =>{
      return {
        id_usuario:pedido.id_usuario,
        nickname: pedido.dadosDosUsuario.nickname
      }
    })

    res.status(200).json({pedidos});
  },
  mudaStatus: async (req, res) =>{
    let { novoStatus, idGrupo, idCandidato } = req.body;
    await UsuarioGrupo.update({
      status:novoStatus
    },{
      where:{
        id_grupo: idGrupo,
        id_usuario: idCandidato
      }
    })

    res.status(200).json({resposta:`Usuário ${novoStatus}.`})
  },
  tiraDoGrupo: async (req, res)=>{
    let { id  }= req.body;
    let idUsuario = req.session.idUsuario;

    await UsuarioGrupo.update({
      status:"saiu",
    },{
      where:{
        id_grupo:id,
        id_usuario:idUsuario
      }
    })
    res.status(200).json({situacao:"Saiu do grupo"});
  }
};