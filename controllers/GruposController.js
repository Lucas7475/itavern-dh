const gruposDB = require("../database/grupos.json");
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
  return Grupo.findAll().then(
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
// essa função traz o numero de integrantes nos grupos
async function numAtualUsuarios(){
  let grupos = await Grupo.findAll({include:[
    {
    model:Usuario,
    as:"usuariosDoGrupo",
}
]}).then(
  data => {
    return data.map( u => u.toJSON())
  });
  let listaParticipantes = grupos.map(grupo => grupo.usuariosDoGrupo.length);
  return listaParticipantes;
}

module.exports = {
  index: (req, res) => {
    res.render("grupos", {
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
    let participantes = await numAtualUsuarios();
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
      jogos,
      participantes
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
    })
    return res.render('editarGrupo', {meusGrupos, jogos});
  }
};