'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsuarioGrupo = sequelize.define('UsuarioGrupo', {
    
  }, {
    tableName: 'usuarios_grupos'
  });
  UsuarioGrupo.associate = function(models) {
    UsuarioGrupo.hasMany(models.Grupo, {
      foreignKey: 'id',
      as:'dadosGrupos'
    })
    UsuarioGrupo.hasMany(models.Usuario, {
      foreignKey: 'id',
      as:'dadosUsuario'
    })
  };
  return UsuarioGrupo;
};