const gruposDB = require("../database/grupos.json");
const { Grupo, Jogo } = require('../models');

module.exports = {
  index: (req, res) => {
    res.render("grupos", {
      gruposDB
    });
  },


  store: async (req,res) => {
    let id_jogo = 1
    let img = `public/images/covers/${req.file.filename}`;
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
    let listaJogos = await Jogo.findAll().then(
      data => {
          return data.map(u => u.toJSON())
      })
    let meusGrupos = [
      {
      "id": 1,
      "nome": "grupo 1",
      "jogo": "Dungeons & Dragons",
      "cidade": "Santa Cruz",
      "icon": "fas fa-hat-wizard",
      "intMembros": 4,
      "intMaxMembros": 7,
      "inicioReuniao":"22/05/2020",
      "horario":"15:00",
      "duracao": 2,
      "cep":"05361050",
      "endereco":"Rua Manoel Patricio Menezes",
      "numero":"52",
      "complemento":"",
      "descricao":"Um grupo",
      "img": "group-cover2.jpg",
      "reunioes": ["terca", "quarta"]
    },
    {
      "id": 2,
      "nome": "grupo 1",
      "jogo": "Dungeons & Dragons",
      "cidade": "Santa Catarina",
      "icon": "fas fa-hat-wizard",
      "intMembros": 4,
      "intMaxMembros": 7,
      "inicioReuniao":"22/05/2020",
      "horario":"15:00",
      "duracao": 2,
      "cep":"05361050",
      "endereco":"Rua Manoel Patricio Menezes",
      "numero":"52",
      "complemento":"",
      "descricao":"Um grupo",
      "img": "group-cover2.jpg",
      "reunioes": ["terca", "quarta"]
    },
    {
      "id": 3,
      "nome": "grupo 8",
      "jogo": "Dungeons & Dragons",
      "cidade": "São Paulo",
      "icon": "fab fa-d-and-d",
      "intMembros": 4,
      "intMaxMembros": 7,
      "inicioReuniao":"22/05/2020",
      "horario":"15:00",
      "duracao": 2,
      "cep":"05361050",
      "endereco":"Rua Manoel Patricio Menezes",
      "numero":"54",
      "complemento":"",
      "descricao":"Um grupo",
      "img": "group-cover3.jpg",
      "reunioes": ["terca", "quarta"]
    }
  ]
  // Conectar com o banco pra trazer as informações
    return res.render('editarGrupo', {meusGrupos, jogos:listaJogos});
  }
};

