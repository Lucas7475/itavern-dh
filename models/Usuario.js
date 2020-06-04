'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    tableName: 'usuarios'
  });
  Usuario.associate = function(models){
    Usuario.belongsToMany(models.Grupo, {
     foreignKey: 'id_usuario',
     as:"gruposDoUsuario",
     through: models.UsuarioGrupo
    })
  };
  return Usuario;
};