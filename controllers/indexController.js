let meusGrupos = [{
    "id": 1,
    "nome": "grupo 1",
    "jogo": "Dungeons & Dragons",
    "local": "Santa Catarina",
    "icon": "fas fa-hat-wizard",
    "intMembros": 4,
    "intMaxMembros": 7,
    "img": "group-cover2.jpg",
    "reunioes": ["Terças, Quartas"]
  },
  {
    "id": 1,
    "nome": "grupo 1",
    "jogo": "Dungeons & Dragons",
    "local": "Santa Catarina",
    "icon": "fas fa-hat-wizard",
    "intMembros": 4,
    "intMaxMembros": 7,
    "img": "group-cover2.jpg",
    "reunioes": ["Terças, Quartas"]
  },
  {
    "id": 1,
    "nome": "grupo 8",
    "jogo": "Dungeons & Dragons",
    "local": "Santa Catarina",
    "icon": "fab fa-d-and-d",
    "intMembros": 4,
    "intMaxMembros": 7,
    "img": "group-cover3.jpg",
    "reunioes": ["Terças, Quartas"]
  }
]
// Conectar com o banco pra trazer as informações
let gruposSugeridos = [1, 2]

module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  home: (req, res) => {
    res.render("home", {
      meusGrupos,
      gruposSugeridos
    });
  },
  perfil: (req, res) => {
    res.render("editar-perfil");
  }
};