'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('grupos', [
        {
          id_jogo: 1,
          nome: "Taverneiros",
          numJogadores: 5,
          diasReuniao: "Segunda-Feira, Sexta-Feira",
          horario:"18:00",
          tempoJogo: "3:30",
          inicioReuniao: new Date(),
          img: "",
          descricao: "Grupo fundado pelos criadores da plataforma",
          cep: "04717-789",
          numero: 123,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_jogo: 1,
          nome: "Ozerath",
          numJogadores: 6,
          diasReuniao: "Sábado, Domingo",
          horario:"19:00",
          tempoJogo: "3:00",
          inicioReuniao: new Date(),
          img: "",
          descricao: "Desbravando o mundo de Ozerath!",
          cep: "04243-729",
          numero: 312,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_jogo: 3,
          nome: "Terroes do Abismo",
          numJogadores: 7,
          diasReuniao: "Quarta-Feira, Quinta-Feira",
          horario:"08:00",
          tempoJogo: "2:00",
          inicioReuniao: new Date(),
          img: "",
          descricao: "Venham descobrir os mistérios de cthulhu",
          cep: "02123-019",
          numero: 456,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_jogo: 4,
          nome: "Atormentados",
          numJogadores: 10,
          diasReuniao: "Sexta-Feira",
          horario:"20:00",
          tempoJogo: "4:00",
          inicioReuniao: new Date(),
          img: "",
          descricao: "Explorando o mundo de Tormenta",
          cep: "03241-921",
          numero: 789,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('grupos', null, {});

  }
};
