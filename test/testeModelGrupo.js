const { sequelize, Grupo, Jogo, Usuario } = require('../models');

/* PEGANDO SÓ O GRUPO */
// Grupo.findAll().then(
//     data => {
//         data.map( u => {
//             let item = u.toJSON();
//             console.log(item);
//         });
//         sequelize.close();
//     }
// )


/* PEGANDO O GRUPO COM OS USUARIOS DO GRUPO */
Grupo.findAll({include:[
        {
        model:Usuario,
        as:"usuariosDoGrupo",
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


/* PEGANDO O GRUPO COM O SEU JOGO */
// Grupo.findAll({include:[
//     {
//         model:Jogo,
//         as:"jogoDoGrupo",
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
