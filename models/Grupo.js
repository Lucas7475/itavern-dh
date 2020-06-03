'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grupo = sequelize.define('Grupo', {
    nome:{
      type:DataTypes.STRING,
      allowNull: false
    }, 
    numJogadores:{
      type:DataTypes.NUMBER,
      allowNull: false
    },
    diasReuniao:{
      type:DataTypes.STRING,
      allowNull: false
    },
    horario:{
      type:DataTypes.STRING,
      allowNull: false
    },
    tempoJogo:{
      type:DataTypes.STRING,
      allowNull: false
    },
    inicioReuniao: {
      type:DataTypes.DATE,
      allowNull: false
    },
    img: DataTypes.STRING,
    descricao: DataTypes.STRING,
    cep: {
      type:DataTypes.STRING,
      allowNull:false
    },
    numero: DataTypes.NUMBER
  }, {
    tableName: 'grupos'
  });
  Grupo.associate = function(models) {
    Grupo.belongsTo(models.Jogo,{
      foreignKey: 'id_jogo'
    })
  };
  return Grupo;
};