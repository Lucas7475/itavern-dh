const gruposDB = require("../database/grupos.json");
const { Grupo, Jogo } = require('../models');

module.exports = {
  index: (req, res) => {
    res.render("grupos", {
      gruposDB
    });
  },

  teste: async (req,res) => {
    let meusGrupos = await Grupo.findAll({include:[
      {
          model:Jogo,
          as:"jogoDoGrupo",
      }
  ]},{where:{id_admin:6}}).then(
          data => {
              let listaGrupos = data.map( u => {
                  return u.toJSON();
              })
              return listaGrupos;
          }
  )
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

    res.redirect('../home')
  },
  

  search: async (req, res) => {
    let listaJogos = await Jogo.findAll().then(
      data => {
          return data.map(u => u.toJSON())
      })
    let grupos = gruposDB

    let {
      searchText,
      groupSize,
      distance
    } = req.query;

    if (searchText) {
      let res = grupos.filter(grupo => {
        return (grupo.nome.includes(searchText) || grupo.jogo.includes(searchText))
      })
      grupos = res
    }

    res.render("grupos-busca", {
      grupos,
      jogos: listaJogos
    });
  },
  showEdit: async (req, res) => {

    let idUsuario = req.session.idUsuario;

    let listaJogos = await Jogo.findAll().then(
      data => {
          return data.map(u => u.toJSON())
      })
    
    // Conectar com o banco pra trazer as informações
    let meusGrupos = await Grupo.findAll({include:[
      {
          model:Jogo,
          as:"jogoDoGrupo",
      }
  ],where:{id_admin:idUsuario}}).then(
          data => {
              let listaGrupos = data.map( u => {
                  return u.toJSON();
              })
              return listaGrupos;
          }
  )
    return res.render('editarGrupo', {meusGrupos, jogos:listaJogos});
  }
};

