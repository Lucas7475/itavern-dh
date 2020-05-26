const gruposDB = require("../database/grupos.json");
const { Grupo } = require('../models');

module.exports = {
  index: (req, res) => {
    res.render("grupos", {
      gruposDB
    });
  },


  store: async (req,res) => {

    let imgGrupo = `public/images/covers/${req.file.filename}`;
    let {nome, numJogador,inicioReuniao, horario, duracao, cep, descricao, diaReuniao} = req.body
    console.log(nome,numJogador,inicioReuniao,horario,duracao,cep, descricao, diaReuniao);


  },


  search: (req, res) => {
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
      grupos
    });
  },
};

