module.exports = (sequelize, DataTypes) => {
    const twiliouser = sequelize.define('twiliouser',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            phone : { type: DataTypes.STRING },
        }
    );
    return twiliouser;
} 