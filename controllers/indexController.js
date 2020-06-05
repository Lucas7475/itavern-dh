const gruposDB = require("../database/grupos.json");

const { Jogo } = require('../models');



module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  home: async (req, res) => {
    let listaJogos = await Jogo.findAll().then(
      data => {
          return data.map(u => u.toJSON())
      }
)
    res.render("home", {
      gruposDB,
      jogos: listaJogos
    });
  },
  perfil: async (req, res) => {
    let listaJogos = await Jogo.findAll().then(
      data => {
          return data.map(u => u.toJSON())
      }
)
    res.render("editar-perfil", {jogos:listaJogos});
  },
  chat: (req,res) =>{
    console.log(req.query)
    res.render("grupos",{
      gruposDB,
    })
  },
  info: (req, res) => {
    
  }
};