let Endereco = (sequelize, DataTypes) => {
    let endereco = sequelize.define(
        'Endereco', {
            id_endereco:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            cep: {
                type:DataTypes.INTEGER,
                allowNull: false
            },
            numero: {
                type:DataTypes.STRING,
                allowNull: false
            },
            
        },
        {
            tableName: 'endereco',
            timestamps: false
        });


        return endereco
}

module.exports = Endereco;