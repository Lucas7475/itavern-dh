const { sequelize, UsuarioGrupo, Usuario, Grupo } = require('../models');

/* TESTE TRAZENDO SÓ A TABELA */
// UsuarioGrupo.findAll().then(
//         data => {
//             console.log(data.map(u => u.toJSON()));
//             sequelize.close();
//         }
// )

/* TRAZENDO UM GRUPO COM AS INFORMAÇÕES DO USUARIO */
// UsuarioGrupo.findAll({include:[
//     {
//         model:Usuario,
//         as:"dadosDosUsuario",
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


/* TRAZENDO UM GRUPO E SUAS INFORMAÇÕES */
// UsuarioGrupo.findAll({include:[
//     {
//         model:Grupo,
//         as:"dadosDosGrupos",
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


/* TRAZENDO UM GRUPO E OS USUARIO COM SUAS INFORMAÇÕES */
UsuarioGrupo.findAll({include:[
    {
        model:Grupo,
        as:'dadosDosGrupo'
    },
    {
        model:Usuario,
        as:'dadosDosUsuario'
    }
]}).then(
        data => {
            data.map( u => {
                let item = u.toJSON();
                console.log(item);
            });
            sequelize.close();
        }
)