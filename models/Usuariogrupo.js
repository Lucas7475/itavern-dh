'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsuarioGrupo = sequelize.define('UsuarioGrupo', {
    
  }, {
    tableName: 'usuarios_grupos'
  });
  UsuarioGrupo.associate = function(models) {
    UsuarioGrupo.hasMany(models.Usuario, {
      foreignKey: 'id'
    });
    UsuarioGrupo.hasMany(models.Grupo, {
      foreignKey: 'id'
    })
  };
  return UsuarioGrupo;
};