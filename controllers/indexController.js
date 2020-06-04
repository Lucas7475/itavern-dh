const gruposDB = require("../database/grupos.json");

module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  home: (req, res) => {
    res.render("home", {
      gruposDB
    });
  },
  perfil: (req, res) => {
    res.render("editar-perfil");
  },
  chat: (req,res) =>{
    console.log(req.query)
    res.render("grupos",{
      gruposDB
    })
  },
  info: (req, res) => {
    
  }
};