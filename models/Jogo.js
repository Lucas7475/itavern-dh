let Jogo = (sequelize, DataTypes) => {
    let jogo = sequelize.define(
        'Jogo', {
            id_jogo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull:false,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: 'jogo',
            timestamps: false
        }
    )

    return jogo;
}

module.exports = Jogo;