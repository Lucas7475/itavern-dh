const { sequelize, Usuario, Grupo } = require('../models');

/* PEGANDO TODOS OS USUARIOS */
// Usuario.findAll().then(
//         data => {
//             console.log(data.map(u => u.toJSON()));
//             sequelize.close();
//         }
// )

/* PEGANDO OS USUARIOS COM OS GRUPOS QUE PERTENCEM*/
// Usuario.findAll({include:[
//     {
//         model:Grupo,
//         as:"gruposDoUsuario"
//     }
// ]}).then(
//         data => {
//             data.map( u => {
//                 let item = u.toJSON();
//                 console.log(item);
//             });
//             sequelize.close();
//         }
// )

// uma query pra trazer os grupos que
// o usuario logado pertence
//req.session.idUsuario
Usuario.findByPk(1,{include:[
    {
        model:Grupo,
        as:"gruposDoUsuario"
    }
]}).then(data => {
    console.log(data.toJSON().gruposDoUsuario);
        }
)