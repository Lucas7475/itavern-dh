let ListaAmigo = (sequelize, DataTypes) => {
    let listaAmigo = sequelize.define(
        'ListaAmigo', {
            id_usuario: DataTypes.INTEGER,
            id_amigo: DataTypes.INTEGER
        }, 
        {
            tableName: 'lista_amigo',
            timestamps: false
        });

    return listaAmigo;
}

module.exports = ListaAmigo;