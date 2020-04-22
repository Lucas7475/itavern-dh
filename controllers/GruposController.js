const gruposDB = require("../database/grupos.json");

module.exports = {
  index: (req, res) => {
    res.render("grupos", {
      gruposDB
    });
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