const gruposDB = require("../database/grupos.json");
const { Op } = require('sequelize');
const { Grupo, Jogo, UsuarioGrupo, Usuario } = require('../models');

// essa função traz todos os jogos do banco
function listaJogos(){
  return Jogo.findAll().then(
    data => {
        return data.map(u => u.toJSON())
    });
}
// essa função traz todos os grupos e apenas os grupos
function gruposAll(){
  return Grupo.findAll({include:[
    {
      model: Usuario,
      as:"usuariosDoGrupo"
    },
    {
      model: Jogo,
      as: 'jogoDoGrupo'
    }
  ]}).then(
    data => data.map( u => u.toJSON()))
}
// essa função traz os grupos que um usuario está
function gruposUsuario(id){
  return Grupo.findAll({include:[
    {
        model:Jogo,
        as:"jogoDoGrupo",
    }
],where:{id_admin:id}}).then(
        data => data.map( u => u.toJSON()))
}
//carrega as imagens com problema
function imgDoGrupo(id){
  Grupo.findByPk(id).then(resul=>{
    return resul.toJSON().img;
  })
}
//troca o formato da data pro formato americano
function arrumaDataDom(dataPt){
  let dia = dataPt.substr(0,2);
  let mes = dataPt[3] + dataPt[4];
  let ano = dataPt.substr(6);
  return `${ano}/${mes}/${dia}`;
}
//troca o formato da data pro formato Pt
function arrumaDataDb(dataUs){
  let dia = `0${dataUs.getDate()}`.length == 2? `0${dataUs.getDate()}`:`${dataUs.getDate()}`;
  let mes = `0${dataUs.getMonth() + 1}`.length == 2? `0${dataUs.getMonth() + 1}`:`${dataUs.getMonth() + 1}`;
  let ano = dataUs.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

module.exports = {
  index: (req, res) => {
    let nickname = req.session.usuario.nickname;
    res.render("grupos", {
      nickname,
      gruposDB
    });
  },
  teste: async (req,res) => {
    let meusGrupos = await gruposUsuario(6);
    for(grupo of meusGrupos){
     console.log(grupo.inicioReuniao.toString());
    }  
    res.send({message:"oi"});

  },
  store: async (req,res) => {
    let img = `../../images/covers/${req.file.filename}`;
    let id_jogo = req.body.nomeJogo
    let id_admin = req.session.idUsuario;

    let {nome,
         numJogadores,
         diasReuniao,
         horario,
         tempoJogo,
         inicioReuniao,
         cep,
         numero,
         descricao} = req.body
    
    diasReuniao = diasReuniao.toString();
    inicioReuniao = arrumaDataDom(inicioReuniao);

    await Grupo.create({id_jogo,
                        id_admin,
                        nome,
                        numJogadores,
                        diasReuniao,
                        horario,
                        tempoJogo,
                        inicioReuniao,
                        img,
                        descricao,
                        cep,
                        numero});
    let id_grupo = await Grupo.findOne({
      where:{
        nome: nome
      }
    }).then(grupo => grupo.toJSON());
    await UsuarioGrupo.create({
      id_grupo: id_grupo.id,
      id_usuario: id_admin
    })

    res.redirect('../home')
  },
  search: async (req, res) => {
    let jogos = await listaJogos();
    let grupos = await gruposAll();
    let participantes = grupos.map(grupo => grupo.usuariosDoGrupo.length);
    let {
      searchText,
      groupGame,
      groupSize,
      distance
    } = req.query;
    
    if (searchText) {
      grupos = grupos.filter(grupo => {
        let umNome = grupo.nome.toLowerCase();
        let pesquisado = searchText.toLowerCase().trim();
        return (umNome.includes(pesquisado))
      })
    }
    if(groupGame){
      grupos = grupos.filter(grupo =>{
        return grupo.jogoDoGrupo.id == groupGame;
      })
    }
    grupos.forEach(grupo => {
      if(grupo.img == ""){
        grupo.img = "group-cover.jpg";
      }
    })
    let nickname = req.session.usuario.nickname;

    res.render("grupos-busca", {
      grupos,
      jogos,
      participantes,
      nickname
    });
  },
  showEdit: async (req, res) => {

    let idUsuario = req.session.idUsuario;
    let jogos = await listaJogos();
    // Conectar com o banco pra trazer as informações
    let meusGrupos = await gruposUsuario(idUsuario);
    meusGrupos.forEach(grupo => {
      if(grupo.img == ""){
        grupo.img = "/images/covers/group-cover.jpg";
      }
      grupo.inicioReuniao = arrumaDataDb(grupo.inicioReuniao);
    })

    let nickname = req.session.usuario.nickname;

    res.render('editarGrupo', {meusGrupos, jogos, nickname});
  },
  update: async (req, res) =>{
    let { id } = req.params;
    let img;
    if(req.file == undefined){
      img = await imgDoGrupo(id);
    }else{
      img = `../../images/covers/${req.file.filename}`;
    }
    let id_jogo = req.body.nomeJogo
    let {nome,
      numJogadores,
      diasReuniao,
      horario,
      tempoJogo,
      inicioReuniao,
      cep,
      numero,
      descricao} = req.body

    await Grupo.update({
                        id_jogo,
                        nome,
                        numJogadores,
                        diasReuniao,
                        horario,
                        tempoJogo,
                        inicioReuniao,
                        img,
                        descricao,
                        cep,
                        numero
    },{
      where:{
        id:id
      }
    });
    res.redirect('../editarGrupos');
  },
  delete: async (req, res) =>{
    let { id } = req.body;


    await Grupo.destroy({where:{id:id}});
    await UsuarioGrupo.destroy({where:{id_grupo:id}});

    res.status(200).send();
  },
  addGrupo: async (req, res) =>{
    let { id } = req.body;
    console.log(id)
    let idUsuario = req.session.idUsuario;

    await UsuarioGrupo.create({
      id_grupo: id,
      id_usuario: idUsuario,
    })

    res.status(200).send();
  }
};