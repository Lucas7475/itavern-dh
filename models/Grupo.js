let Grupo = (sequelize, DataTypes) => {
    let grupo = sequelize.define(
        'Grupo', {
            id_grupo: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            num_jogadores: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            dias_reunião: {
                type: DataTypes.STRING,
                allowNull:false
            },
            inicio_reuniao:{
                type: DataTypes.DATE,
                allowNull: false
            },
            img: DataTypes.STRING,
            descricao: DataTypes.STRING,
            id_endereco: DataTypes.INTEGER,
            id_restricao: DataTypes.INTEGER,
            id_jogo:DataTypes.INTEGER
        },{
            tableName:grupo,
            timestamps:false
        });

        return grupo
}


module.exports = Grupo;