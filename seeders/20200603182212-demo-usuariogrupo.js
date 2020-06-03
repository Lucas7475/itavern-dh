'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('usuarios_grupos', [
        {
          id_grupo: 1,
          id_usuario: 1,
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 1,
          id_usuario: 2,
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 1,
          id_usuario: 3,
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 1,
          id_usuario: 4,
          createdAt: new Date,
          updatedAt: new Date
        },
        {
          id_grupo: 1,
          id_usuario: 5,
          createdAt: new Date,
          updatedAt: new Date
        },

      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('usuarios_grupos', null, {});
  }
};
