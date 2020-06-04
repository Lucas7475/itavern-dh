const { sequelize, Usuario, Grupo } = require('../models');

/* PEGANDO TODOS OS USUARIOS */
// Usuario.findAll().then(
//         data => {
//             console.log(data.map(u => u.toJSON()));
//             sequelize.close();
//         }
// )

/* PEGANDO OS USUARIOS COM OS GRUPOS QUE PERTENCEM*/
Usuario.findAll({include:[
    {
        model:Grupo,
        as:"gruposDoUsuario"
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
