'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('usuarios', [
        {
          nome: 'Lucas Silva',
          nickname: 'lps',
          img_perfil:"../../images/covers/dragknight.jpg",
          email: 'lucas@lucas.com',
          senha: '123456',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Iriss Queiroz',
          nickname: 'irissquei',
          img_perfil:"../../images/covers/dragknight.jpg",
          email: 'iriss@iriss.com',
          senha: '123456',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Fabiano Capadocia',
          nickname: 'fabcap',
          img_perfil:"../../images/covers/dragknight.jpg",
          email: 'fabiano@fabiano.com',
          senha: '123456',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Sandra Jorge',
          nickname: 'sdj',
          img_perfil:"../../images/covers/dragknight.jpg",
          email: 'sandra@sandra.com',
          senha: '123456',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nome: 'Alfredo Laurel',
          nickname: 'alr',
          img_perfil:"../../images/covers/dragknight.jpg",
          email: 'alfredo@alfredo.com',
          senha: '123456',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('usuarios', null, {});

  }
};
