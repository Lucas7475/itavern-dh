let Usuario = (sequelize, DataTypes) => {
    let usuario = sequelize.define(
        'Usuario', {
            id_usuario: {
                type: DataTypes.INTEGER,
                primaryKey:true,
                allowNull: false,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'usuario',
            timestamps: false
        });

    return usuario;
}


module.exports = Usuario;