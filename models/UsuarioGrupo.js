let UsuarioGrupo = (sequelize, Datatypes) => {
    usuarioGrupo = sequelize.define(
        'UsuarioGrupo', {
            id_grupo: Datatypes.INTEGER,
            id_usuario: Datatypes.INTEGER
        },
        {
            tableName:'usuario_grupo',
            timestamps:false
        });

        return usuarioGrupo;
}

module.exports = UsuarioGrupo;